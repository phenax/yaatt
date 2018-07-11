// export * from './docs-generator';

import path from 'path';
import { saveHtmlDocument } from './docs-generator';


saveHtmlDocument(path.resolve('./test-www/index.html'), [
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
]);
