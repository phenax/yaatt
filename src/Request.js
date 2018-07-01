// @flow

import { pick, compose, prop, evolve, identity , mergeDeepRight} from 'ramda';
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

const defaultProps = {
	test: {
		onResponse: res => res.get([]),
		params: {},
		data: {},
		label: '',
	},
};

const Request = createClass({
	constructor: compose(
		normalize,
		mergeDeepRight(defaultProps),
		pick([
			'url',
			'method',
			'headers',
			'test',
			'dependencies',
		]),
	),

	onResponse: self => (...args) => self.test.onResponse(...args),

	execute: self => (getOptions: any => any) =>
		self.executeDependencies()
			.map(listToMap)
			.map(dependencies => ({ request: self, dependencies }))
			.chain(compose(
				request,
				self.toRequest,
				self.merge,
				normalize,
				mergeDeepRight(defaultProps),
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
