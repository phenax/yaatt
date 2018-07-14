
const path = require('path');
const glob = require('glob');
const { map, compose, flatten, prop } = require('ramda');
const { runTestSuite } = require('@yaatt/core');
const { mapFutureSync, logInfo } = require('@yaatt/utils');

const importTestCase = require;

const resolvePaths = compose(
	map(path.resolve),
	flatten,
	map(glob.sync),
);

const loadTestSuites = compose(
	map(importTestCase),
	resolvePaths,
);

const executeTestSuites = compose(
	mapFutureSync(runTestSuite),
	logInfo('Running tests...'),
	loadTestSuites,
	prop('testSuites'),
);

module.exports = {
	importTestCase,
	resolvePaths,
	loadTestSuites,
	executeTestSuites
};
