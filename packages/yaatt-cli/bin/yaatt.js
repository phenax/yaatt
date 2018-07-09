#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const { flatten, map, compose } = require('ramda');
const yargs = require('yargs');

const { runTestSuite } = require('@yaatt/core');
const { mapFutureSync, throwError, logError, logNewLine } = require('@yaatt/utils');

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

initTests(yargs.argv._ || [])
	.fork(logError, logNewLine);
