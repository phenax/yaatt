import {identity} from 'ramda';

import {Request} from '../src/Request';
import { request } from '@yaatt/utils';

describe('Request', () => {

	beforeEach(() => {
		request.mock = data => Promise.resolve({ data });
	});

	afterEach(() => {
		request.mock = null;
	});

	describe('#getPartialRequest', () => {

		it('should return property value from response data', () => {
			const req = Request({
				request: {
					_: ({ wow }) => ({ yo: 'wowow', wow })
				}
			});

			const partialReq = req.getPartialRequest({ wow: 'now' });
            
			expect(partialReq.request.wow).toBe('now');
			expect(partialReq.request.yo).toBe('wowow');
		});
	});

	describe('#execute', () => {

		it('should return property value from response data', done => {
			const req = Request({
				request: {
					url: '/wow',
					params: { a: 'b' },
				},
				onResponse: identity,
			});

			req.execute()
				.fork(
					done,
					({ data }) => {
						expect(data).toEqual(req.request);
						done();
					},
				);
		});
	});
});
