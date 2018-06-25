// @flowa

import { pick, compose } from 'ramda';

import { toParams, toTestCases, mapFutureSync, request, tryF } from './utils';
import Response from './Response';
import { logTestSuite, logTestCase } from './logger';

// import type { TestCase } from './types';

const runTestCase = (testCase) => {
	const { test } = testCase;

	const options = pick([
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
			logTestCase(testCase, true);
			return resp;
		})
		.mapRej(e => {
			logTestCase(testCase, false);
			return e;
		});
};

const runTestSuite = compose(
	mapFutureSync(runTestCase),
	toTestCases,
	logTestSuite,
);


module.exports = {
	runTestCase,
	runTestSuite,
};
