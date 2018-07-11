
export * from './docs-generator';
import { renderTestSuite } from './docs-generator';

console.log(renderTestSuite({
	label: 'Httpbin Get call',
	request: {
		url: 'http://httpbin.org/get',
		method: 'get',
	},
	tests: {
		'should have name set to Waluigi': { request: { params: { name: 'Waluigi' } } },
		'should have custom header set to Yep': { },
	},
}));
