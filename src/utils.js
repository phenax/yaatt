
const { parse } = require('querystring');
const { curry } = require('ramda');
const axios = require('axios');
const Future = require('fluture');

const throwError = (e = 'Unknown Error') => {
    if(typeof e === 'string' || typeof e === 'number')
        throw new Error(e);
    throw e;
};

const toParams = query => {
    if(!query) return undefined;

    if(typeof query === 'string') {
        return parse(query); // TODO: Parse string
    }

    return query;
};

const toTestCases = ({ url, method, tests }) =>
    Object.keys(tests)
        .map(label => ({
            url,
            method,
            label,
            test: tests[label],
        }));

const mapFutureSync = curry(
    (fn, list) => list.reduce(
        (fChain, item, index) =>
            fChain.chain(data => fn(item, index, data)),
        Future.of(null)
    )
);

const mapFutureAsync = curry(
    (fn, list) => Future.parallel(10, list.map(fn))
);

const request = Future.encaseP(axios);

const tryF = fn => (...args) => Future.try(() => fn(...args));

module.exports = {
    throwError,
    toParams,
    toTestCases,
    mapFutureSync,
    mapFutureAsync,
    request,
    tryF,
};
