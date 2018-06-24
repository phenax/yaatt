
const axios = require('axios');

const { toParams, toTestCases, mapAsync } = require('./utils');
const Response = require('./Response');
const { logTestSuite, logTestCase } = require('./logger');

const runTestCase = (testCase) => {
    const { url, method, test, label } = testCase;

    logTestCase(testCase);

    const request = {
        method,
        url,
        params: toParams(testCase.query),
        data: toParams(testCase.data || {}),
    };

    return axios(request)
        .then(Response)
        .then(resp => test.onResponse(resp));
};

const runTestSuite = (testSuite) => {
    const { title, url, method = 'get' } = testSuite;

    logTestSuite(testSuite);

    mapAsync(runTestCase, toTestCases(testSuite))
        .catch(e => console.error(new Error(e))); // TODO: Use chalk

    return testSuite;
};

module.exports = {
    runTestCase,
    runTestSuite,
};
