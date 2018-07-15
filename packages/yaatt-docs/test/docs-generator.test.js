
import { toDocsFormat, buildApiDocs } from '../src/docs-generator';

jest.mock('../src/webpack.js');

const dummyTestSuites = [
	{
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
	},
	{
		label: 'Important call',
		request: {
			url: 'http://someurl.com/path',
			method: 'put',
		},
		tests: {
			'should have a as b': {
				request: { params: 'a=b' },
			},
			'should do important stuff': {
				onResponse: res => res,
			},
		},
	},
];

describe('docs generator', () => {

	describe('toDocsFormat', () => {

		it('should format test suites to api document format', () => {

			const testSuite = dummyTestSuites[0];
			const apiDoc = toDocsFormat(testSuite);

			expect(apiDoc.name).toBe(testSuite.label);
			expect(apiDoc.id.length).toBe(10);
			expect(apiDoc.url).toBe(testSuite.request.url);
			expect(apiDoc.method).toBe(testSuite.request.method);
			expect(apiDoc.request).toEqual({});
			expect(apiDoc.tests).toHaveLength(2);
		});
	});

	describe('buildApiDocs', () => {

		it('should call webpack with the config object with the correct output dir', done => {

			const future = buildApiDocs({
				testSuites: dummyTestSuites,
				outputDir: './some-directory/output',
			});

			future.fork(
				e => done(e),
				config => {
					expect(config.output.path).toContain('some-directory/output');
					expect(/\/some-directory\/output$/gi.test(config.output.path)).toBeTruthy();
					done();
				},
			);
		});
	});
});
