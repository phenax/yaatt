#!/usr/bin/env node

const path = require('path');
const glob = require('glob');
const { flatten, map, compose } = require('ramda');
const yargs = require('yargs');
const axios = require('axios');

const { runTestSuite } = require('../src/test-runner');
const { mapFutureSync } = require('../src/utils');
const { logError } = require('../src/logger');

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

initTests(yargs.argv._ || [])
    .fork(
        logError,
        () => console.log(''),
    );
