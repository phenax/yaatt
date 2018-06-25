
module.exports = {
	label: 'Httpbin Get call',
	url: 'http://httpbin.org/get',
	method: 'get',
	dependencies: {
		auth: {
			url: 'http://httpbin.org/post',
			method: 'post',
			data: { uid: 'hello_world' },
			onResponse: r => JSON.stringify(r.get([ 'data' ])),
		}
	},
	tests: {
		'should have name set to Waluigi': ({ dependencies }) => ({
			params: {
				uid: dependencies.auth.uid,
			},
			onResponse: response =>
				response
					.matchProp([ 'args', 'name' ], 'Waluigi')
		}),
	},
};
