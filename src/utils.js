// @flow

import { parse } from 'querystring';
import { curry, identity, compose, converge, assoc, prop } from 'ramda';
import axios from 'axios';
import Future from 'fluture';

import type { QueryParams, TestError, TestSuite, Test, RequestOptions, MapFutureFunction, KeyValue } from './types';

export const throwError = (e: TestError = 'Unknown Error') => {
	if(typeof e === 'string' || typeof e === 'number')
		throw new Error(e);
	throw e;
};

export const toParams = (query: QueryParams) => {
	if(!query) return undefined;

	if(typeof query === 'string') {
		return parse(query);
	}

	return query;
};

export const toTestCases = ({ url, method, dependencies, tests }: TestSuite): Array<Test> =>
	Object.keys(tests)
		.map(label => ({
			url,
			method,
			label,
			dependencies,
			test: tests[label],
		}));

export const mapFutureSync: MapFutureFunction = curry(
	(fn, list) => list.reduce(
		(fChain, item, index) =>
			fChain.chain(data => fn(item, index, data)),
		Future.of(null)
	)
);

export const mapFutureAsync: MapFutureFunction = curry(
	(fn, list) => Future.parallel(10, list.map(fn))
);

export const request: (RequestOptions => Future) = Future.encaseP(options =>
	request.mock? request.mock(options): axios(options));

export const tryF = (fn: (any) => any) => (...args: Array<any>) =>
	Future.try(() => fn(...args));


export const constant = (x: any) => () => x;

export const mapToList = (objectMap: Object): Array<KeyValue> =>
	Object.keys(objectMap || {}).map(key => ({ key, value: objectMap[key] }));

export const listToMap = (list: Array<KeyValue>) =>
	(list || []).reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

export const initializeMethods = curry((methods: Object, obj: Object) => {
	Object.keys(methods).forEach(name => {
		obj[name] = methods[name](obj);
	});
	return obj;
});

export const createClass = ({ constructor = identity, ...methods }: Object) => compose(
	initializeMethods(methods),
	constructor,
);

export const mutateField = (fieldName: string, ...fns: Array<Function>) => converge(assoc(fieldName), [
	compose(...fns, prop(fieldName)),
	identity
]);
