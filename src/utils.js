
const { curry } = require('ramda');

const throwError = (e = 'Unknown Error') => {
    if(typeof e === 'string' || typeof e === 'number')
        throw new Error(e);
    throw new e;
};

const toParams = query => {
    if(typeof query === 'string') {
        return { def: 'wow' }; // TODO: Parse string
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

const mapAsync = curry((fn, list) =>
    list.reduce(
        (pChain, item, index) =>
            pChain.then(data => fn(item, index, data)),
        Promise.resolve(null)
    ));


module.exports = {
    throwError,
    toParams,
    toTestCases,
    mapAsync,
};
