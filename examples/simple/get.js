
module.exports = {
	label: 'Httpbin Get call',
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
				response
					.matchProp([ 'args', 'name' ], 'Waluigi')
		},
		'should have custom header set to Yep': {
			request: {
				headers: {
					'X-Hello-World': 'Yep',
				},
			},
			onResponse: response =>
				response
					.assert(({ data }, { throwError }) => {
						if(data.headers['X-Hello-World'] !== 'Yep') {
							throwError('No match header. Me no likey');
						}
					})
		},
	},
};


