// @flow

import { parse } from 'querystring';
import { curry } from 'ramda';
import axios from 'axios';
import Future from 'fluture';

import type { QueryParams, TestError, TestSuite, TestCase, RequestOptions, MapFutureFunction, Pair } from '../types';

type ThrowErrorOptions = { future: bool, promise: bool };
export const throwError = (e: TestError = 'Unknown Error', options?: ThrowErrorOptions) => {
	const error = (e instanceof Error)? e: new Error(e);
	const { future, promise } = options || {};

	if(promise) {
		return Promise.reject(error);
	} else if(future) {
		return Future.reject(error);
	}

	throw error;
};

export const toParams = (query: QueryParams) => {
	if(!query) return {};

	if(typeof query === 'string') {
		return parse(query);
	}

	return query;
};

type TestSuiteToTestCases = TestSuite => Array<TestCase>;
export const toTestCases: TestSuiteToTestCases =
	({ request, dependencies, tests }) =>
		Object.keys(tests).map(label => {
			const test = tests[label];
			return {
				...test,
				label,
				request: { ...request, ...test.request },
				dependencies,
			};
		});

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


type FetchFunction = RequestOptions => Future;
export const request: FetchFunction = Future.encaseP(options =>
	request.mock? request.mock(options): axios(options));

export const tryF = (fn: (any) => any) => (...args: Array<any>) =>
	Future.try(() => fn(...args));


export const constant = (x: any) => () => x;

export const mapToList = (objectMap: Object): Array<Pair> =>
	Object.keys(objectMap || {}).map(key => ({ key, value: objectMap[key] }));

export const listToMap = (list: Array<Pair>) =>
	(list || []).reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
