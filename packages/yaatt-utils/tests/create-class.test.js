
import { createClass } from '..';

const isOdd = x => x % 2;

describe('utils', () => {

	describe('create class', () => {

		it('should execute the constructor', () => {
			const OddList = createClass({
				constructor: list => ({
					list: list.filter(isOdd)
				}),
			});

			const odds = OddList([ 1, 2, 3, 4, 5, 6 ]);

			expect(odds.list).toEqual([ 1, 3, 5 ]);
		});

		it('should pass instance to methods', () => {
			const OddList = createClass({
				constructor: list => ({
					list: list.filter(isOdd)
				}),
				first: self => () => self.list[0],
			});

			const odds = OddList([ 2, 3, 4, 5, 6 ]);

			expect(odds.first()).toBe(3);
		});

		it('should pass destructured values to methods even after changes', () => {
			const OddList = createClass({
				constructor: list => ({
					list: list.filter(isOdd)
				}),
				concat: self => newItems =>
					self.list = self.list.concat(newItems),
				get: ({ list }) => index =>
					list[index],
			});

			const odds = OddList([ 2, 3, 4, 5, 6 ]);

			odds.concat([ 99, 100 ]);

			expect(odds.get(2)).toBe(99);
			expect(odds.get(3)).toBe(100);
		});

		it('should inherit methods from parent class with .extend static method', () => {

			const NumberList = createClass({
				constructor: list => ({ list }),
				concat: self => newItems =>
					self.list = self.list.concat(newItems),
				get: ({ list }) => index => list[index],
			});

			const OddList = NumberList.extend({
				constructor: ({ list }) => ({
					list: list.filter(isOdd)
				}),
				concat: self => newItems =>
					self.list = self.list.concat(newItems.filter(isOdd)),
			});

			const numbers = NumberList([ 2, 3, 4, 5, 6 ]);
			const odds = OddList([ 2, 3, 4, 5, 6 ]);

			expect(numbers.get(0)).toBe(2);
			expect(odds.get(0)).toBe(3);
		});
	});
});
