// @flow

import { compose } from 'ramda';
import Future from 'fluture';

import { toTestCases, mapFutureSync } from './utils';
import Request from './Request';
import { logTestSuite, logTestCase } from './logger';

import type { Test, TestSuite } from './types';


export const runTestCase = (testCase: Test): Future => {
	const { test, label } = testCase;
	test.label = label;

	const getTest = (typeof test !== 'function')? (() => test): test;

	return Request(testCase)
		.execute(getTest)
		.map(resp => {
			logTestCase(test, true);
			return resp;
		})
		.mapRej(e => {
			logTestCase(test, false);
			return e;
		});
};

export const runTestSuite: (TestSuite => Future) = compose(
	mapFutureSync(runTestCase),
	toTestCases,
	logTestSuite,
);
