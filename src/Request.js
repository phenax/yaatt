// @flow

import { pick, compose, assoc, prop, identity, converge, merge } from 'ramda';
import Future from 'fluture';

import { toParams, mapFutureAsync, request, tryF } from './utils';
import Response from './Response';


const constant = x => () => x;

const mapToList = (objectMap: Object) =>
	Object.keys(objectMap).map(key => ({ key, value: objectMap[key] }));

const listToMap = (list: Array<Object>) =>
	list.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

const callDependency = ({ key, value }: Object): Future =>
	Request(value)
		.execute()
		.map(dependency => ({ key, value: dependency }));

const executeDependencies = compose(
	mapFutureAsync(callDependency),
	mapToList,
);

const initializeMethods = (methods, obj) => {
	Object.keys(methods).forEach(name => {
		obj[name] = methods[name](obj);
	});
	return obj;
};


const Request = compose(
	obj => initializeMethods(Request.methods, obj),
	converge(assoc('data'), [ compose(toParams, prop('data')), identity ]),
	converge(assoc('params'), [ compose(toParams, prop('params')), identity ]),
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
);

Request.methods = {
	execute: req => (getOptions: any => any) =>
		executeDependencies(req.dependencies || {})
			.map(listToMap)
			.map(dependencies => ({ request: req, dependencies }))
			.chain(compose(request, merge(req), getOptions || constant({})))
			.map(Response)
			.chain(tryF(req.onResponse))
};

export default Request;
