
import { throwError, toParams } from '../src/utils';

describe('utils', () => {

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
