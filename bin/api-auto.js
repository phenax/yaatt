#!/usr/bin/env node

const yargs = require('yargs');
const axios = require('axios');

const simpleTestSuite = require('../examples/simple');

const { runTestSuite } = require('../src/test-runner');

runTestSuite(simpleTestSuite);
