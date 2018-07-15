
import Future from 'fluture';
import { identity, sum } from 'ramda';

import { throwError, toParams, mapToList, listToMap, tryF, toTestCases, mapFutureAsync, mapFutureSync } from '../src/helpers';

describe('helpers', () => {

	describe('throwError', () => {

		it('should throw e if given an object', () => {
			let e;

			e = new Error('Some error');
			expect(() => throwError(e)).toThrowError(e.message);

			e = {};
			expect(() => throwError(e)).toThrowError(e.message);
		});

		it('should throw Error<String> if given a string', () => {
			let e;

			e = 'Unknown Error';
			expect(() => throwError(e)).toThrow(e);
		});


		it('should return rejected promise is promise option is passed', done => {
			const errorMessage = 'Unknown Error';

			throwError(errorMessage, { promise: true })
				.then(() => done('Promise should have been rejected'))
				.catch(e => {
					expect(e.message).toBe(errorMessage);
					done();
				});
		});

		it('should return rejected future is future option is passed', done => {
			const errorMessage = 'Unknown Error';

			throwError(errorMessage, { future: true })
				.fork(
					e => {
						expect(e.message).toBe(errorMessage);
						done();
					},
					() => done('Future should have been rejected')
				);
		});
	});

	describe('toParams', () => {

		it('should return params untouched if given an object', () => {

			const params = { name: 'wow' };

			expect(toParams(params)).toEqual(params);
		});

		it('should return empty object if given undefined', () => {
			expect(toParams(undefined)).toEqual({});
			expect(toParams(null)).toEqual({});
			expect(toParams('')).toEqual({});
		});

		it('should return parsed params if given a query string', () => {

			const params = 'name=wow&some=thing';

			expect(toParams(params)).toEqual({
				name: 'wow',
				some: 'thing',
			});
		});
	});


	describe('mapToList, listToMap', () => {

		it('should convert an object to Array<Pair> and back to an object', () => {
			
			const obj = {
				a: 'b',
				c: 'd',
				x: 'x',
			};

			const pairList = mapToList(obj);

			expect(pairList).toEqual([
				{ key: 'a', value: 'b' },
				{ key: 'c', value: 'd' },
				{ key: 'x', value: 'x' },
			]);

			expect(listToMap(pairList)).toEqual(obj);
		});

		it('should work for empty object', () => {
			
			const obj = {};

			const pairList = mapToList(obj);

			expect(pairList).toEqual([]);
			expect(listToMap(pairList)).toEqual(obj);
		});
	});


	describe('tryF', () => {

		it('should convert a passed function to a future factory', done => {

			const fn = jest.fn(identity);

			tryF(fn)('Hello').fork(
				done,
				x => {
					expect(fn).toBeCalledWith('Hello');
					expect(x).toBe('Hello');
					done();
				},
			);
		});

		it('should reject future if the function throws an error', done => {

			const fn = jest.fn(() => {
				throw new Error('ERROR EXPLOSION');
			});

			tryF(fn)().fork(
				e => {
					expect(e.message).toBe('ERROR EXPLOSION');
					done();
				},
				() => done('Wasnt supposed to run'),
			);
		});
	});

	describe('toTestCases', () => {

		it('should convert test suite to a list of test cases', () => {

			const testSuite = {
				request: {
					url: '/',
				},
				tests: {
					'should do stuff': {
						request: {
							params: 'a=b',
							c: 'd',
						},
						onResponse: identity,
					},
					'should do more stuff': {},
				},
			};

			const testCases = toTestCases(testSuite);

			expect(testCases).toHaveLength(2);
			expect(testCases[0].request).toEqual({
				url: '/',
				params: 'a=b',
				c: 'd',
			});
			expect(testCases[0].label).toBe('should do stuff');
		});
	});

	describe('mapFutureAsync', () => {

		it('should map over the list with future factory', done => {

			const list = [ 1, 2, 3, 4, 5 ];
			const futureSquares = jest.fn(i => Future.of(i * i));

			mapFutureAsync(futureSquares, list)
				.fork(
					done,
					squares => {
						expect(futureSquares).toHaveBeenCalledTimes(list.length);
						expect(squares).toEqual([ 1, 4, 9, 16, 25 ]);
						done();
					}
				);
		});

		it('should map over the list with future factory asynchronously', done => {

			const list = [ 1, 2, 3, 4, 5 ];
			let numberOfCalls = 0;

			const futureOrders = jest.fn(i => Future((_, res) => {
				if(i === 3) {
					setTimeout(() => res(++numberOfCalls), 20);
				} else {
					res(++numberOfCalls);
				}
			}));

			mapFutureAsync(futureOrders, list)
				.fork(
					done,
					sequence => {
						expect(sequence).toEqual([ 1, 2, 5, 3, 4 ]);
						expect(futureOrders).toHaveBeenCalledTimes(list.length);
						done();
					}
				);
		});
	});


	describe('mapFutureSync', () => {

		it('should map over the list with future factory (reducer)', done => {

			const list = [ 1, 2, 3, 4, 5 ];
			const futureAdder = jest.fn((data, _, i) => Future.of(i + data));

			mapFutureSync(futureAdder, list)
				.fork(
					done,
					addition => {
						expect(futureAdder).toHaveBeenCalledTimes(list.length);
						expect(addition).toEqual(sum(list));
						done();
					}
				);
		});

		it('should map over the list with future factory synchronously', done => {

			const list = [ 1, 2, 3, 4, 5 ];
			const orderOfExecution = [];

			const futureOrders = jest.fn(i => Future((_, res) => {
				const resolve = () => {
					orderOfExecution.push(i);
					res(orderOfExecution);
				};

				if(i === 3) {
					setTimeout(resolve, 20);
				} else {
					resolve();
				}
			}));

			mapFutureSync(futureOrders, list)
				.fork(
					done,
					data => {
						expect(data).toEqual([ 1, 2, 3, 4, 5 ]);
						expect(futureOrders).toHaveBeenCalledTimes(list.length);
						done();
					}
				);
		});
	});
});
