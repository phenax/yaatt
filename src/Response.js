
const { pick, path: propPath } = require('ramda');
const { throwError } = require('./utils');

const Response = (_response) => {

    const response = pick([
        'data',
        'status',
        'headers',
    ], _response);

    const self = {
        matchProp: (key, value) =>
            (propPath(key, response.data) === value)
                ? self
                : throwError(`Prop ${key} was ${response.data[key]}, expected ${value}`),
        assert(fn) {
            fn(response, { throwError });
            return self;
        },
    };

    return self;
};

module.exports = Response;
