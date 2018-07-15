
import { throwError, toParams } from '../src/helpers';

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

	// describe('toTestCases', () => {

	//     it('should return params untouched if given an object', () => {

	//         const params = { name: 'wow' };

	//         expect(toTestCases(params)).toEqual({ name: 'wow' });
	//     });

	//     it('should return empty object if given undefined', () => {
	//         expect(toTestCases(undefined)).toBeUndefined();
	//         expect(toTestCases(null)).toBeUndefined();
	//         expect(toTestCases('')).toBeUndefined();
	//         expect(toTestCases()).toBeUndefined();
	//     });

	//     it('should return parsed params if given a query string', () => {

	//         const params = 'name=wow&some=thing';

	//         expect(toTestCases(params)).toEqual({
	//             name: 'wow',
	//             some: 'thing',
	//         });
	//     });
	// });
});
