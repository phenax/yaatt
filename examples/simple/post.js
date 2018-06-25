
module.exports = {
	label: 'Httpbin Post call',
	url: 'http://httpbin.org/post',
	method: 'post',
	tests: {
		'should have name set to Mario': {
			data: {
				name: 'Mario',
			},
			onResponse: response =>
				response
					.matchProp(['data'], '{"name":"Mario"}')
		},
		'should have custom header set to Nope': {
			headers: {
				'X-Hello-World': 'Nope',
			},
			onResponse: response =>
				response
					.matchProp([ 'headers', 'X-Hello-World' ], 'Nope')
		},
	},
};
