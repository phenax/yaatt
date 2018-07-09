
import {Response} from '../src/Response';
import Joi from 'joi';

describe('Response', () => {

	describe('#get', () => {

		it('should return property value from response data', () => {
			const response = Response({
				data: {
					hello: 'world'
				}
			});
            
			expect(response.get([ 'hello' ])).toBe('world');
		});

		it('should return property value from response data (nested structure)', () => {
			const response = Response({
				data: {
					hello: {
						world: {
							list: [
								{ cool: 'wow' }
							]
						}
					}
				}
			});
            
			expect(response.get([ 'hello', 'world', 'list', 0, 'cool' ])).toBe('wow');
		});

		it('should return undefined if field is not in the data', () => {
			const response = Response({ data: { } });
            
			expect(response.get([ 'boot', 'soot', 'groot' ])).toBeUndefined();
		});
	});


	describe('#matchProp', () => {

		it('should not throw error if the props match', () => {
			const response = Response({
				data: {
					hello: 'world'
				}
			});
            
			expect(() => response.matchProp([ 'hello' ], 'world')).not.toThrowError();
		});

		it('should throw error when the props dont match', () => {
			const response = Response({ data: { hello: 'b' } });

			expect(() => response.matchProp([ 'hello' ], 'world')).toThrowError();
		});
	});

	describe('#matchHeader', () => {

		it('should not throw error if the props match', () => {
			const response = Response({
				headers: {
					'X-Access-Token': 'hrin4fwef'
				}
			});

			expect(() => response.matchHeader('X-Access-Token', 'hrin4fwef')).not.toThrowError();
		});

		it('should throw error when the props dont match', () => {
			const response = Response({ headers: { hello: 'b' } });

			expect(() => response.matchHeader([ 'hello' ], 'world')).toThrowError();
		});
	});


	describe('#matchSchema', () => {

		const schema = Joi.object().keys({
			name: Joi.string(),
			uid: Joi.string(),
			email: Joi.string().email(),
		});

		it('should not throw error if the schema match', () => {
			const response = Response({ data: {
				name: 'Shrek Third',
				uid: '8723tbwyufwsd',
				email: 'shrek.third@wow.com',
			} });
            
			expect(() => response.matchSchema(schema)).not.toThrowError();
		});

		it('should not throw error if the schema match', () => {
			const response = Response({ data: {
				name: 'Shrek Third',
				uid: '8723tbwyufwsd',
				email: 'shrekthird-not-email',
			} });

			expect(() => response.matchSchema(schema)).toThrowError();
		});
	});
});
