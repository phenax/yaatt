//@flow

import { pick, path as propPath, compose } from 'ramda';
import Joi from 'joi';

import { createClass, throwError } from './utils';

import type { ServerResponse, ResponseClass } from './types';

const Response: ResponseClass = createClass({
	constructor: compose(
		pick([
			'data',
			'status',
			'headers',
		]),
	),
	matchProp: self => (keys: Array<string>, value: any) => {
		const fieldValue = self.get(keys);
		return fieldValue === value
			? self
			: throwError(`Property "${keys.join('.')}" of the response was "${fieldValue}", expected "${value}"`);
	},
	matchHeader: self => (key: string, value: string) => {
		const headerValue = self.headers[key];
		return headerValue === value
			? self
			: throwError(`Header "${key}" of the response was "${headerValue}", expected "${value}"`);
	},
	get: self => (keys: Array<string>) => propPath(keys, self.data),
	matchSchema: self => (schema: Joi) => {
		const { error } = Joi.validate(self.data, schema);
		error && throwError(error);
		return self;
	},
	assert: self => (fn: (ServerResponse, Object) => any) => {
		fn(self, { throwError });
		return self;
	},
});

export default Response;
