// @flow

import { pick, compose, merge, prop, evolve, identity } from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF, mapToList, createClass, listToMap, constant } from './utils';
import Response from './Response';

const callDependency = ({ key, value }: Object): Future =>
	Request(dependencyToRequest(value))
		.execute()
		.map(dependency => ({ key, value: dependency }));

const dependencyToRequest = ({ onResponse, params, data, ...dependency }) => ({
	...dependency,
	test: { onResponse, params, data },
});

const normalize = evolve({
	test: {
		data: toParams,
		params: toParams,
	}
});

const Request = createClass({
	constructor: compose(
		// self => { console.log('>> test', self.test); return self; },
		normalize,
		merge({
			test: {
				onResponse: res => res.get([]),
				params: {},
				data: {},
			},
			method: 'get',
			dependencies: {},
		}),
		pick([
			'url',
			'method',
			'headers',
			'test',
			'dependencies',
		]),
	),
	onResponse: ({ test }) => test.onResponse || identity,
	execute: (self: any) => (getOptions: any => any) =>
		self.executeDependencies()
			.map(listToMap)
			.map(dependencies => ({ request: self, dependencies }))
			.chain(compose(
				request,
				self.toRequest,
				self.merge,
				normalize,
				test => ({ test }),
				getOptions || constant({}),
			))
			.map(Response)
			.chain(tryF(self.onResponse)),
	merge: self => obj => Object.assign(self, obj),
	toRequest: () => ({ url, method, test }) => ({
		url,
		method,
		...test,
	}),
	executeDependencies: self => () => compose(
		mapFutureAsync(callDependency),
		mapToList,
		prop('dependencies'),
	)(self),
});

export default Request;
