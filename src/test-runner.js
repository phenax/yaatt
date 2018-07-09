// @flow

import { compose } from 'ramda';
import Future from 'fluture';

import { toTestCases, mapFutureSync } from './utils';
import { validateTestSuite } from './utils/validation';
import Request from './Request';
import { logTestSuite, logTestCase } from './utils/logger';

import type { TestCase, TestSuite } from './types';

type TestCaseRunner = TestCase => Future;
export const runTestCase: TestCaseRunner = testCase => {
	return Request(testCase)
		.execute()
		.map(resp => {
			logTestCase(testCase, true);
			return resp;
		})
		.mapRej(e => {
			logTestCase(testCase, false);
			return e;
		});
};

type TestSuiteRunner = TestSuite => Future;
export const runTestSuite: TestSuiteRunner = compose(
	mapFutureSync(runTestCase),
	toTestCases,
	logTestSuite,
	validateTestSuite,
);
