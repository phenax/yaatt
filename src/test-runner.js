
const axios = require('axios');
const { pick } = require('ramda');

const { toParams, toTestCases, mapAsync } = require('./utils');
const Response = require('./Response');
const { logTestSuite, logTestCase, logError } = require('./logger');

const runTestCase = (testCase) => {
    const { test } = testCase;

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
        .then(test.onResponse)
        .then(resp => {
            logTestCase(testCase, true);
            return resp;
        })
        .catch(e => {
            logTestCase(testCase, false);
            throw e;
        });
};

const runTestSuite = (testSuite) => {

    logTestSuite(testSuite);

    return mapAsync(runTestCase)(toTestCases(testSuite))
        .catch(logError);
};

module.exports = {
    runTestCase,
    runTestSuite,
};
