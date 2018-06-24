
const axios = require('axios');
const { pick } = require('ramda');

const { toParams, toTestCases, mapAsync } = require('./utils');
const Response = require('./Response');
const { logTestSuite, logTestCase } = require('./logger');

const runTestCase = (testCase) => {
    const { test } = testCase;

    logTestCase(testCase);

    const request = pick([
        'method',
        'url',
        'headers',
        'params',
        'data',
    ], { ...testCase, ...test });

    request.params = toParams(request.params);
    request.data = toParams(request.data);

    return axios(request)
        .then(Response)
        .then(test.onResponse);
};

const runTestSuite = (testSuite) => {

    logTestSuite(testSuite);

    mapAsync(runTestCase, toTestCases(testSuite))
        .catch(e => console.error(new Error(e))); // TODO: Use chalk

    return testSuite;
};

module.exports = {
    runTestCase,
    runTestSuite,
};
