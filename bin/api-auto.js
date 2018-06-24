#!/usr/bin/env node

const { flatten, map, compose } = require('ramda');
const yargs = require('yargs');
const axios = require('axios');
const path = require('path');
const glob = require('glob');

const { runTestSuite } = require('../src/test-runner');
const { mapAsync } = require('../src/utils');

if(!yargs.argv._[0]) {
    throw new Error('Need to specify path to test suite');
}

const initTests = compose(
    mapAsync(runTestSuite),
    map(require),
    map(path.resolve),
    flatten,
    map(glob.sync),
);

initTests(yargs.argv._ || []);
