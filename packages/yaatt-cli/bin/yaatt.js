#!/usr/bin/env node

const { map, compose, prop, cond, T, propSatisfies } = require('ramda');
const { runTestSuite } = require('@yaatt/core');
const { mapFutureSync, logError, logNewLine, logInfo } = require('@yaatt/utils');
const { buildDocs } = require('@yaatt/docs');
// const Future = require('fluture');

const { importTestCase, resolvePaths, validateArgs, getConfig } = require('../src');

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

const toDocumentationOptions = ({ testSuites, documentation, ...props }) => ({
	testSuites: loadTestSuites(testSuites),
	...props,
	...documentation
});

const generateDocumentation = compose(
	map(logInfo('Build successful', 'green')),
	buildDocs,
	logInfo('Generating documentation...'),
	toDocumentationOptions,
);


const isDocs = propSatisfies(x => !!x, 'documentation');

const init = compose(
	cond([
		[ isDocs,  generateDocumentation ],
		[ T,       executeTestSuites ],
	]),
	validateArgs,
	getConfig,
);

init().fork(logError, logNewLine);
