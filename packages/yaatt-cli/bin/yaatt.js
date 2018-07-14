#!/usr/bin/env node

const { compose, cond, T, propSatisfies } = require('ramda');
const { logError, logNewLine } = require('@yaatt/utils');

const { validateArgs, getConfig } = require('../src/cli-utils');
const { executeTestSuites } = require('../src/tester');
const { generateDocumentation } = require('../src/docs');


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
