
module.exports = {
	label: 'Http get call after authentication (dependency)',
	request: {
		url: 'http://httpbin.org/get',
		method: 'get',
	},
	dependencies: {
		auth: {
			request: {
				url: 'http://httpbin.org/get',
				method: 'get',
				params: { uid: 'hello_world_ahjdshk8' },
			},
			onResponse: r => r.get([ 'args' ]),
		}
	},
	tests: {
		'should have uid set correctly as passed from the dependency': {
			request: {
				_: ({ dependencies }) => ({
					params: {
						uid: dependencies.auth.uid,
					},
				}),
			},
			onResponse: response =>
				response
					.matchProp([ 'args', 'uid' ], 'hello_world_ahjdshk8')
		},
	},
};
