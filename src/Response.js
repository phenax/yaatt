//@flow

const { pick, path: propPath } = require('ramda');
const Joi = require('joi');

const { throwError } = require('./utils');

import type { ServerResponse, ResponseHelper } from './types';

const Response = (_response: ServerResponse): ResponseHelper => {

	const response: ServerResponse = pick([
		'data',
		'status',
		'headers',
	], _response);

	const self = {
		matchProp(keys: Array<string>, value: any) {
			const fieldValue = self.get(keys);
			return fieldValue === value
				? self
				: throwError(`Property "${keys.join('.')}" of the response was "${fieldValue}", expected "${value}"`);
		},
		get(keys: Array<string>) {
			const fieldValue = propPath(keys, response.data);
			return fieldValue;
		},
		matchSchema(schema: Object) {
			const { error } = Joi.validate(response.data, schema);
			error && throwError(error);
			return self;
		},
		assert(fn: (ServerResponse, Object) => any) {
			fn(response, { throwError });
			return self;
		},
	};

	return self;
};

module.exports = Response;
