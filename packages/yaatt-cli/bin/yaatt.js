#!/usr/bin/env node

const path = require('path');
const { map, compose, prop, cond, propSatisfies, T, isEmpty, not } = require('ramda');
const { runTestSuite } = require('@yaatt/core');
const { mapFutureSync, logError, logNewLine, log } = require('@yaatt/utils');

const { importTestCase, resolvePaths, validateArgs, getArguments } = require('../src');

const loadConfig = compose(
	require,
	path.resolve,
);

const toCliConfig = ({ _: testSuites }) => ({
	testSuites,
});

const isConfigPassed = propSatisfies(compose(not, isEmpty), 'config');

const argumentsToConfig = cond([
	[ isConfigPassed,  compose(loadConfig, prop('config')) ],
	[ T,               toCliConfig ],
]);

const getConfig = compose(
	argumentsToConfig,
	getArguments,
);


const init = compose(
	mapFutureSync(runTestSuite),
	map(importTestCase),
	resolvePaths,
	prop('testSuites'),
	validateArgs,
	getConfig,
);

init().fork(logError, logNewLine);
