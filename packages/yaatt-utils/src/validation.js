import Joi from 'joi';

import { throwError } from './helpers';

export const Request = Joi.object().keys({
	url: Joi.string(),
	method: Joi.string(),
	headers: Joi.object(),
	params: [ Joi.object(), Joi.string() ],
	data: [ Joi.object(), Joi.string() ],
	_: Joi.func(),
});

export const TestCase = Joi.object().keys({
	label: Joi.string().empty(''),
	description: Joi.string().empty(''),
	request: Request.empty({}),
	dependencies: Joi.object(),
	onResponse: Joi.func(),
});

export const TestSuite = Joi.object().keys({
	label: Joi.string().required(),
	description: Joi.string(),
	request: Request.append({
		url: Joi.string().required(),
	}).required(),
	dependencies: Joi.object(),
	tests: Joi.object().pattern(
		Joi.string(),
		TestCase,
	),
});

export const validateSchema = schema => obj => {
	const { error } = Joi.validate(obj, schema);
	error && throwError(error);
	return obj;
};

export const validateTestSuite = validateSchema(TestSuite);

export const validateRequest = validateSchema(TestCase);
