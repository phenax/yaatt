
const uid = 'hello_world_ahjdshk8';

module.exports = {
	label: 'Http get call after authentication (dependency)',
	request: {
		url: 'http://httpbin.org/get',
		method: 'get',
	},
	dependencies: {
		auth: {
			request: {
				url: 'http://httpbin.org/post',
				method: 'post',
				data: { uid },
			},
			onResponse: r => JSON.parse(r.get([ 'data' ])),
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
					.matchProp([ 'args', 'uid' ], uid)
		},
	},
};
