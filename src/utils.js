// @flow

import { parse } from 'querystring';
import { curry } from 'ramda';
import axios from 'axios';
import Future from 'fluture';

import type { QueryParams, TestError, TestSuite, Test, RequestOptions, MapFutureFunction } from './types';

const throwError = (e: TestError = 'Unknown Error') => {
	if(typeof e === 'string' || typeof e === 'number')
		throw new Error(e);
	throw e;
};

const toParams = (query: QueryParams) => {
	if(!query) return undefined;

	if(typeof query === 'string') {
		return parse(query);
	}

	return query;
};

const toTestCases = ({ url, method, dependencies, tests }: TestSuite): Array<Test> =>
	Object.keys(tests)
		.map(label => ({
			url,
			method,
			label,
			dependencies,
			test: tests[label],
		}));

const mapFutureSync: MapFutureFunction = curry(
	(fn, list) => list.reduce(
		(fChain, item, index) =>
			fChain.chain(data => fn(item, index, data)),
		Future.of(null)
	)
);

const mapFutureAsync: MapFutureFunction = curry(
	(fn, list) => Future.parallel(10, list.map(fn))
);

const request: (RequestOptions => Future) = Future.encaseP(options =>
	request.mock? request.mock(options): axios(options));

const tryF = (fn: (any) => any) => (...args: Array<any>) =>
	Future.try(() => fn(...args));

module.exports = {
	throwError,
	toParams,
	toTestCases,
	mapFutureSync,
	mapFutureAsync,
	request,
	tryF,
};
