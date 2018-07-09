
import path from 'path';
import glob from 'glob';
import { flatten, map, compose } from 'ramda';
import yargs from 'yargs';

import { runTestSuite } from '../src/test-runner';
import { mapFutureSync, throwError } from '../src/utils';
import { logError, logNewLine } from '../src/utils/logger';

// TODO: Use Joi to validate arguments
// TODO: Have more config passed via arguments
const validateArgs = suitePaths => {
	if(!suitePaths.length) {
		return throwError('Need to specify path to test suite');
	}

	return suitePaths;
};

const importTestCase = require;

const initTests = compose(
	mapFutureSync(runTestSuite),
	map(importTestCase),
	map(path.resolve),
	flatten,
	map(glob.sync),
	validateArgs,
);

export default () =>
	initTests(yargs.argv._ || [])
		.fork(logError, logNewLine);
