// @flow

import { pick, compose } from 'ramda';
import Future from 'fluture';

import { toParams, toTestCases, mapFutureSync, request, tryF } from './utils';
import Response from './Response';
import { logTestSuite, logTestCase } from './logger';

import type { Test, TestSuite, RequestOptions } from './types';

const runTestCase = (testCase: Test): Future => {
	const { test } = testCase;

	const options: RequestOptions = pick([
		'method',
		'url',
		'headers',
		'params',
		'data',
	], { ...testCase, ...test });

	options.params = toParams(options.params);
	options.data = toParams(options.data);

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

const runTestSuite: (TestSuite => Future) = compose(
	mapFutureSync(runTestCase),
	toTestCases,
	logTestSuite,
);


module.exports = {
	runTestCase,
	runTestSuite,
};
