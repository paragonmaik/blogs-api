import request from 'supertest';
import app from '../app';
import prisma from '../db';
import { StatusCodes } from 'http-status-codes';
import { seedDB } from '../../prisma/test-setup';

describe('DELETE /user/me', () => {
	// beforeAll(() => {
	// 	seedDB();
	// });

	describe('With invalid token', () => {
		const invalidTokenCases = ['invalid-token', ''];

		it('should respond with status code 401', async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get('/post/1')
					.set('Authorization', token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it('should respond with correct message in case of empty token', async () => {
			const response = await request(app)
				.get('/post/1')
				.set('Authorization', invalidTokenCases[1]);

			expect(response.body.message).toBe('Token not found');
		});

		it('should respond with correct message in case of invalid token', async () => {
			const response = await request(app)
				.get('/post/1')
				.set('Authorization', invalidTokenCases[0]);

			expect(response.body.message).toBe('Expired or invalid token');
		});
	});
});
