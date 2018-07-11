
import { toDocsFormat } from '../src';

describe('docs generator', () => {

	describe('toDocsFormat', () => {

		it('should format test suites to api document format', () => {

			const testSuite = {
				label: 'Httpbin Get call',
				request: {
					url: 'http://httpbin.org/get',
					method: 'get',
				},
				tests: {
					'should have name set to Waluigi': {
						request: { params: 'a=b' },
					},
					'should have custom header set to Yep': {
						request: { params: 'b=c' },
					},
				},
			};
			const apiDoc = toDocsFormat(testSuite);

			expect(apiDoc.name).toBe(testSuite.label);
			expect(apiDoc.url).toBe(testSuite.request.url);
			expect(apiDoc.method).toBe(testSuite.request.method);
			expect(apiDoc.request).toEqual({});
			expect(apiDoc.tests).toHaveLength(2);
		});

		it('should format test suites to api document format', () => {

			const testSuite = {
				label: 'Httpbin Get call',
				request: {
					url: 'http://httpbin.org/get',
					method: 'get',
				},
				tests: {
					'should have name set to Waluigi': {
						request: { params: 'a=b' },
					},
					'should have custom header set to Yep': {
						request: { params: 'b=c' },
					},
				},
			};
			const apiDoc = toDocsFormat(testSuite);

			console.log(apiDoc);

			expect(apiDoc.name).toBe(testSuite.label);
			expect(apiDoc.url).toBe(testSuite.request.url);
			expect(apiDoc.method).toBe(testSuite.request.method);
			expect(apiDoc.request).toEqual({});
			expect(apiDoc.tests).toHaveLength(2);
		});
	});
});
