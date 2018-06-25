
const { pick, path: propPath } = require('ramda');
const Joi = require('joi');

const { throwError } = require('./utils');

const Response = (_response) => {

	const response = pick([
		'data',
		'status',
		'headers',
	], _response);

	const self = {
		matchProp(keys, value) {
			const fieldValue = self.get(keys);
			return fieldValue === value
				? self
				: throwError(`Property "${keys}" of the response was "${fieldValue}", expected "${value}"`);
		},
		get(keys) {
			const fieldValue = propPath(keys, response.data);
			return fieldValue;
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
