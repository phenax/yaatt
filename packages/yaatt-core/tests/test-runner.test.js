
// import Future from 'fluture';

import { runTestCase, runTestSuite } from '../test-runner';
import { konsole } from '@yaatt/utils/logger';
import { request } from '@yaatt/utils';

describe('Test running', () => {

	let resetKonsole = null;

	beforeEach(() => {
		konsole.isEnabled = false;
		resetKonsole = null;
		request.mock = data => Promise.resolve({ data });
	});

	afterEach(() => {
		resetKonsole && resetKonsole();
		request.mock = null;
	});


	describe('runTestCase', () => {

		it('should make an http request to the correct url with the right options', done => {

			const testCase = {
				request: {
					url: '/stuff',
					method: 'get',
					params: {
						a: 'b',
					},
				},
				onResponse: resp => resp.get([]),
			};

			runTestCase(testCase)
				.fork(
					done,
					resp => {
						expect(resp.url).toBe(testCase.request.url);
						expect(resp.method).toBe(testCase.request.method);
						expect(resp.params).toEqual(testCase.request.params);
						done();
					}
				);
		});

		it('should make an http request with the parsed params and data', done => {

			const parsedData = { foo: 'baar', wow: 'ocools' };

			const testCase = {
				request: {
					url: '/stuff',
					method: 'get',
					params: 'foo=baar&wow=ocools',
					data: 'foo=baar&wow=ocools',
				},
				onResponse: resp => resp.get([]),
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
				request: {
					url,
					params: {
						wow: 'cool',
						abc: 'old_value',
					},
					_: () => ({ params }),
				},
				onResponse: resp => resp.get([]),
			};

			runTestCase(testCase)
				.fork(
					done,
					({ url, params }) => {
						expect(url).toBe(url);
						expect(params).toEqual({
							abc: 'cde',
							wow: 'cool',
						});
						done();
					}
				);
		});
	});

	describe('runTestSuite', () => {

		it('should log test suite details to console', done => {

			const logMock = jest.fn();
			resetKonsole = konsole.mock({ log: logMock });

			const testSuite = {
				label: '_',
				request: {
					url: 'http://httpbin.org/get',
					method: 'get',
				},
				tests: {},
			};

			runTestSuite(testSuite)
				.fork(
					e => done(`Future failed :: ${e}`),
					() => {
						expect(logMock).toBeCalled();
						expect(logMock.mock.calls[1][0]).toContain(testSuite.label);
						done();
					},
				);
		});

		it('should run all test cases inside testSuite', done => {

			const onResponse = jest.fn(() => ({}));

			const testSuite = {
				label: '_',
				request: {
					url: '/get',
					method: 'get',
				},
				tests: {
					'should do stuff 1': { onResponse },
					'should do stuff 2': { onResponse },
					'should do stuff 3': { onResponse },
				},
			};

			runTestSuite(testSuite)
				.fork(
					e => done(`Future failed :: ${e}`),
					() => {
						expect(onResponse).toHaveBeenCalledTimes(3);
						done();
					},
				);
		});

		it('should run auth dependency and call case ith the dependency', done => {

			const testToken = '235tv3wervwegr';

			const testSuite = {
				label: '_',
				request: {
					url: '/get',
					method: 'get',
				},
				dependencies: {
					auth: {
						request: {
							url: '/user/login',
							method: 'post',
							data: { uid: 'hello_world' },
						},
						onResponse: () => ({ token: testToken }),
					},
				},
				tests: {
					'should do stuff': {
						request: {
							_: ({ dependencies }) => {
								expect(dependencies.auth.token).toBe(testToken);
								done();
							},
						},
					},
				},
			};

			runTestSuite(testSuite)
				.fork(
					e => done(`Future failed :: ${e}`),
					() => {},
				);
		});

		it('should merge request with stuff from dependency', done => {

			const testToken = '235tv3wervwegr';

			const testSuite = {
				label: '_',
				request: {
					url: '/get',
					method: 'get',
				},
				dependencies: {
					auth: {
						request: {
							url: '/user/login',
							method: 'post',
							data: { uid: 'hello_world' },
						},
						onResponse: () => ({ token: testToken }),
					},
				},
				tests: {
					'should do stuff': {
						request: {
							_: ({ dependencies }) => ({
								params: {
									uid: dependencies.auth.token
								}
							}),
						},
						onResponse: ({ data }) => {
							expect(data.params.uid).toBe(testToken);
							done();
						},
					},
				},
			};

			runTestSuite(testSuite)
				.fork(
					e => done(`Future failed :: ${e}`),
					() => {},
				);
		});
	});
});
