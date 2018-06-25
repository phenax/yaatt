
import path from 'path';
import glob from 'glob';
import { flatten, map, compose } from 'ramda';
import yargs from 'yargs';

import { runTestSuite } from '../src/test-runner';
import { mapFutureSync } from '../src/utils';
import { logError, logNewLine } from '../src/logger';

const validateArgs = suitePaths => {
	if(!suitePaths.length) {
		throw new Error('Need to specify path to test suite');
	}

	return suitePaths;
};

const initTests = compose(
	mapFutureSync(runTestSuite),
	map(require),
	map(path.resolve),
	flatten,
	map(glob.sync),
	validateArgs,
);

export default () =>
	initTests(yargs.argv._ || [])
		.fork(logError, logNewLine);
