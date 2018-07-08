import Joi from 'joi';

import { throwError } from '../utils';

export const Request = () => Joi.object()/*.keys({
	url: Joi.string(),
	method: Joi.string(),
	headers: Joi.string(),
	params: Joi.string(),
	data: Joi.string(),
	_: Joi.func(),
})*/;

export const TestCase = () => Joi.object().keys({
	label: Joi.string(),
	description: Joi.string(),
	request: Request(),
	onResponse: Joi.func(),
});

export const TestSuite = () => Joi.object().keys({
	label: Joi.string().required(),
	description: Joi.string(),
	request: Request().required(),
	dependencies: Joi.object(),
	tests: Joi.object().pattern(
		Joi.string(),
		TestCase(),
	),
});

export const validateTestSuite = testSuite => {
	const { error } = Joi.validate(testSuite, TestSuite());
	error && throwError(error);
	return testSuite;
};
