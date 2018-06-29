// @flow

import { pick, compose, assoc, prop, identity, converge, merge, curry } from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF } from './utils';
import Response from './Response';


const constant = x => () => x;

const mapToList = (objectMap: Object) =>
	Object.keys(objectMap).map(key => ({ key, value: objectMap[key] }));

const listToMap = (list: Array<Object>) =>
	list.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

const initializeMethods = curry((methods, obj) => {
	Object.keys(methods).forEach(name => {
		obj[name] = methods[name](obj);
	});
	return obj;
});

const createClass = ({ constructor = identity, ...methods }) => compose(
	initializeMethods(methods),
	constructor,
);

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));

const executeDependencies = compose(
	mapFutureAsync(callDependency),
	mapToList,
);

const mutateField = (fieldName, ...fns) => converge(assoc(fieldName), [
	compose(...fns, prop(fieldName)),
	identity
]);

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
		executeDependencies(self.dependencies || {})
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
});


export default Request;
