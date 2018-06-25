// @flow

import { pick, compose, assoc, prop, identity, converge } from 'ramda';
import Future from 'fluture';

import { toParams, toTestCases, mapFutureSync, request, tryF } from './utils';
import Response from './Response';
import { logTestSuite, logTestCase } from './logger';

import type { Test, TestSuite, RequestOptions } from './types';

export const Request: (Object => RequestOptions) = compose(
	converge(assoc('data'), [ compose(toParams, prop('data')), identity ]),
	converge(assoc('params'), [ compose(toParams, prop('params')), identity ]),
	pick([ 'method', 'url', 'headers', 'params', 'data' ]),
);

export const runTestCase = (testCase: Test): Future => {
	const { test } = testCase;

	const options: RequestOptions = Request({ ...testCase, ...test });

	return request(options)
		.map(Response)
		.chain(tryF(test.onResponse))
		.map(resp => {
			logTestCase(testCase.test, true);
			return resp;
		})
		.mapRej(e => {
			logTestCase(testCase.test, false);
			return e;
		});
};

export const runTestSuite: (TestSuite => Future) = compose(
	mapFutureSync(runTestCase),
	toTestCases,
	logTestSuite,
);
