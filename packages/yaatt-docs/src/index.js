// export * from './docs-generator';

import { build } from './docs-generator';


const testSuiteList = [
	{
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
				onResponse: response => response.matchProp([ 'args', 'name' ], 'Waluigi')
			},
			'should have custom header set to Yep': {
				request: {
					headers: {
						'X-Hello-World': 'Yep',
					}
				}
			},
		},
	},
	{
		label: 'Httpbin Post call',
		request: {
			url: 'http://httpbin.org/post',
			method: 'post',
		},
		tests: {
			'should have name set to JoLuigi': {
				request: {
					params: {
						name: 'JoLuigi',
					},
				},
				onResponse: response => response.matchProp([ 'args', 'name' ], 'JoLuigi')
			},
			'should have custom header set to Wow': { },
		},
	},
];

build({ suites: testSuiteList, outputDir: '/home/akshayn/Desktop/randomtest' })
	.fork(
		console.log,
		d => console.log('done')
	);
