//@flow

import { pick, path as propPath, compose } from 'ramda';
import {Joi} from '@yaatt/utils';

import { throwError, createClass } from '@yaatt/utils';

import type { ServerResponse } from './types';

const Response = createClass({
	constructor: compose(
		pick([
			'data',
			'status',
			'headers',
		]),
	),
	matchProp: response => (keys: Array<string>, value: any) => {
		const fieldValue = response.get(keys);
		return fieldValue === value
			? response
			: throwError(`Property "${keys.join('.')}" of the response was "${fieldValue}", expected "${value}"`);
	},
	matchHeader: response => (key: string, value: string) => {
		const headerValue = response.headers[key];
		return headerValue === value
			? response
			: throwError(`Header "${key}" of the response was "${headerValue}", expected "${value}"`);
	},
	get: response => (keys: Array<string>) => propPath(keys, response.data),
	matchSchema: response => (schema: Joi) => {
		const { error } = Joi.validate(response.data, schema);
		error && throwError(error);
		return response;
	},
	assert: response => (fn: (ServerResponse, Object) => any) => {
		fn(response, { throwError });
		return response;
	},
});

export { Response };
