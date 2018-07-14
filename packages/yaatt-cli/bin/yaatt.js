#!/usr/bin/env node

const { map, compose, prop } = require('ramda');
const { runTestSuite } = require('@yaatt/core');
const { mapFutureSync, logError, logNewLine } = require('@yaatt/utils');

const { importTestCase, resolvePaths, validateArgs, getConfig } = require('../src');

const init = compose(
	mapFutureSync(runTestSuite),
	map(importTestCase),
	resolvePaths,
	prop('testSuites'),
	validateArgs,
	getConfig,
);

init().fork(logError, logNewLine);
