
module.exports = {
	label: 'Httpbin Post call',
	request: {
		url: 'http://httpbin.org/post',
		method: 'post',
	},
	tests: {
		'should have name set to Mario': {
			request: {
				data: {
					name: 'Mario',
				},
			},
			onResponse: response =>
				response
					.matchProp(['data'], '{"name":"Mario"}')
		},
		'should have custom header set to Nope': {
			request: {
				headers: {
					'X-Hello-World': 'Nope',
				},
			},
			onResponse: response =>
				response
					.matchProp([ 'headers', 'X-Hello-World' ], 'Nope')
		},
	},
};
