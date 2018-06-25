// @flow

import { parse } from 'querystring';
import { curry } from 'ramda';
import axios from 'axios';
import Future from 'fluture';

import type { QueryParams, TestError, TestSuite, Test, RequestOptions } from './types';

const throwError = (e: TestError = 'Unknown Error') => {
	if(typeof e === 'string' || typeof e === 'number')
		throw new Error(e);
	throw e;
};

const toParams = (query: QueryParams) => {
	if(!query) return undefined;

	if(typeof query === 'string') {
		return parse(query); // TODO: Parse string
	}

	return query;
};

const toTestCases = ({ url, method, tests }: TestSuite): Array<Test> =>
	Object.keys(tests)
		.map(label => ({
			url,
			method,
			label,
			test: tests[label],
		}));

// mapFutureSync :: ((A, number, any) -> Future) -> Array<any> -> Future
const mapFutureSync = curry(
	(fn, list) => list.reduce(
		(fChain, item, index) =>
			fChain.chain(data => fn(item, index, data)),
		Future.of(null)
	)
);

// mapFutureAsync :: ((A, number, any) -> Future) -> Array<any> -> Future
const mapFutureAsync = curry(
	(fn, list) => Future.parallel(10, list.map(fn))
);

const request: (RequestOptions => Future) = Future.encaseP(axios);

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
