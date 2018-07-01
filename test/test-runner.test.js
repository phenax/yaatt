
// import Future from 'fluture';

import { runTestCase, runTestSuite } from '../src/test-runner';
import { konsole } from '../src/logger';
import { request } from '../src/utils';

describe('Test running', () => {

	let resetKonsole = null;

	beforeEach(() => {
		konsole.isEnabled = false;
		resetKonsole = null;
		request.mock = data => Promise.resolve({ data });
	});

	afterEach(() => {
		// konsole.isEnabled = true;
		resetKonsole && resetKonsole();
		request.mock = null;
	});


	describe('runTestCase', () => {

		it('should make an http request to the correct url with the right options', done => {

			const testCase = {
				url: '/stuff',
				method: 'get',
				test: {
					params: {
						a: 'b',
					},
					onResponse: resp => resp.get([]),
				},
			};

			runTestCase(testCase)
				.fork(
					done,
					({ url, method, params }) => {
						expect(url).toBe(testCase.url);
						expect(method).toBe(testCase.method);
						expect(params).toEqual(testCase.test.params);
						done();
					}
				);
		});

		it('should make an http request with the parsed params and data', done => {

			const parsedData = { foo: 'baar', wow: 'ocools' };

			const testCase = {
				url: '/stuff',
				method: 'get',
				test: {
					params: 'foo=baar&wow=ocools',
					data: 'foo=baar&wow=ocools',
					onResponse: resp => resp.get([]),
				},
			};

			runTestCase(testCase)
				.fork(
					done,
					({ data, params }) => {
						expect(params).toEqual(parsedData);
						expect(data).toEqual(parsedData);
						done();
					}
				);
		});

		it('should allow test as a function', done => {

			const url = '/aasdasas';
			const params = 'abc=cde';

			const testCase = {
				url: '/stuff',
				method: 'get',
				test: () => ({
					url,
					params,
					onResponse: resp => resp.get([]),
				}),
			};

			runTestCase(testCase)
				.fork(
					done,
					({ url, params }) => {
						expect(url).toBe(url);
						expect(params).toEqual({ abc: 'cde' });
						done();
					}
				);
		});
	});

	// describe('runTestSuite', () => {

	// 	it('should log test suite details to console', done => {

	// 		const logMock = jest.fn();
	// 		resetKonsole = konsole.mock({ log: logMock });

	// 		const testSuite = {
	// 			label: 'Httpbin Get call',
	// 			url: 'http://httpbin.org/get',
	// 			method: 'get',
	// 			tests: {},
	// 		};

	// 		runTestSuite(testSuite)
	// 			.fork(
	// 				e => done(`Future failed :: ${e}`),
	// 				() => {
	// 					expect(logMock).toBeCalled();
	// 					expect(logMock.mock.calls[1][0]).toContain(testSuite.label);
	// 					done();
	// 				},
	// 			);
	// 	});

	// 	it('should run all test cases inside testSuite', done => {

	// 		const onResponse = jest.fn(() => ({}));

	// 		const testSuite = {
	// 			label: 'Httpbin Get call',
	// 			url: '/get',
	// 			method: 'get',
	// 			tests: {
	// 				'should do stuff 1': { onResponse },
	// 				'should do stuff 2': { onResponse },
	// 				'should do stuff 3': { onResponse },
	// 			},
	// 		};

	// 		runTestSuite(testSuite)
	// 			.fork(
	// 				e => done(`Future failed :: ${e}`),
	// 				() => {
	// 					expect(onResponse).toHaveBeenCalledTimes(3);
	// 					done();
	// 				},
	// 			);
	// 	});

	// 	it('should run auth dependency and call case ith the dependency', done => {

	// 		const testUid = '235tv3wervwegr';

	// 		const testSuite = {
	// 			label: 'Httpbin Get call',
	// 			url: '/get',
	// 			method: 'get',
	// 			dependencies: {
	// 				auth: {
	// 					url: 'http://httpbin.org/post',
	// 					method: 'post',
	// 					data: { uid: 'hello_world' },
	// 					onResponse: () => ({ uid: testUid }),
	// 				},
	// 			},
	// 			tests: {
	// 				'should do stuff': ({ dependencies }) => {
	// 					expect(dependencies.auth.uid).toBe(testUid);
	// 					done();
	// 					return { onResponse: () => {} };
	// 				},
	// 			},
	// 		};

	// 		runTestSuite(testSuite)
	// 			.fork(
	// 				e => done(`Future failed :: ${e}`),
	// 				() => {},
	// 			);
	// 	});
	// });
});
