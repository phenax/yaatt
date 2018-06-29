// @flow

import { pick, compose, merge, prop } from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF, mapToList, createClass, listToMap, mutateField, constant } from './utils';
import Response from './Response';

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));

const Request = createClass({
	constructor: compose(
		merge({
			onResponse: res => res.get([]),
			method: 'get',
			dependencies: {},
		}),
		pick([
			'method',
			'url',
			'headers',
			'params',
			'data',
			'onResponse',
			'dependencies',
		]),
	),
	execute: (self: any) => (getOptions: any => any) =>
		self.executeDependencies()
			.map(listToMap)
			.map(dependencies => ({ request: self, dependencies }))
			.chain(compose(
				request,
				self.normalize,
				merge(self),
				getOptions || constant({})
			))
			.map(Response)
			.chain(tryF(self.onResponse)),
	normalize: () => compose(
		mutateField('data', toParams),
		mutateField('params', toParams),
	),
	executeDependencies: self => () => compose(
		mapFutureAsync(callDependency),
		mapToList,
		prop('dependencies'),
	)(self),
});


export default Request;
