// @flow

import { pick, compose, assoc, prop, identity, converge, merge } from 'ramda';
import Future from 'fluture';

import { toParams, toTestCases, mapFutureSync, request, tryF } from './utils';
import Response from './Response';
import { logTestSuite, logTestCase } from './logger';

import type { Test, TestSuite, RequestOptions } from './types';

export const Request: (Object => RequestOptions) = compose(
	merge({
		execute() {
			return request(this)
				.map(Response)
				.chain(tryF(this.onResponse));
		},
	}),
	converge(assoc('data'), [ compose(toParams, prop('data')), identity ]),
	converge(assoc('params'), [ compose(toParams, prop('params')), identity ]),
	pick([
		'method',
		'url',
		'headers',
		'params',
		'data',
		'onResponse',
	]),
);

export const runTestCase = (testCase: Test): Future => {
	let { test, label } = testCase;

	if(typeof test === 'function') {
		test = test({});
	}

	test.label = label;

	return Request({ ...testCase, ...test })
		.execute()
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
