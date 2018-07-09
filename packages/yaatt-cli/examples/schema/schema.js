
const { Joi } = require('@yaatt/core');

const schema = Joi.object().keys({
	args: { name: 'Waluigi' },
	headers: Joi.object(),
	origin: Joi.string().regex(/^(\d+(\.)?){4}$/gi),
	url: Joi.string(),
});

module.exports = {
	label: 'Httpbin Get call with schema validation',
	request: {
		url: 'http://httpbin.org/get',
		method: 'get',
	},
	tests: {
		'should have name set to Waluigi': {
			request: {
				params: {
					name: 'Waluigi',
				},
			},
			onResponse: response =>
				response.matchSchema(schema)
		},
		'should be able to extend schema': {
			request: {
				params: {
					name: 'Its-a me! Mario!',
				},
			},
			onResponse: response =>
				response
					.matchSchema(schema.append({
						args: {
							name: 'Its-a me! Mario!'
						}
					}))
		},
	},
};


