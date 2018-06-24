
const { pick, path: propPath, join } = require('ramda');
const Joi = require('joi');

const { throwError } = require('./utils');

const Response = (_response) => {

    const response = pick([
        'data',
        'status',
        'headers',
    ], _response);

    const self = {
        matchProp(key, value) {
            const fieldValue = propPath(key, response.data);
            return fieldValue === value
                ? self
                : throwError(`Property "${key}" of the response was "${fieldValue}", expected "${value}"`);
        },
        matchSchema(schema) {
            const { error } = Joi.validate(response.data, schema);
            error && throwError(error);
            return self;
        },
        assert(fn) {
            fn(response, { throwError });
            return self;
        },
    };

    return self;
};

module.exports = Response;
