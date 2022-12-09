import request from 'supertest';
import app from '../app';
import prisma from '../db';
import { StatusCodes } from 'http-status-codes';
import { lewisLogindata } from './mocks/loginMockData';
import { seedDB } from '../../prisma/test-setup';

describe('DELETE /user/me', () => {
	beforeAll(() => {
		seedDB();
	});

	describe('With valid token', () => {
		it('should respond with status code 204', async () => {
			const loginResponse = await request(app)
				.post('/login')
				.send(lewisLogindata);

			const response = await request(app)
				.delete('/user/me')
				.set('Authorization', loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.NO_CONTENT);
		});

		it('should not be able to find user in the database', async () => {
			const deletedUser = await prisma.user.findFirst({
				where: {
					email: lewisLogindata.email,
				},
			});

			expect(deletedUser).toBeNull();
		});
	});
	describe('With invalid token', () => {
		const invalidTokenCases = ['invalid-token', ''];

		it('should respond with status code 401', async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get('/user/me')
					.set('Authorization', token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it('should respond with correct message in case of empty token', async () => {
			const response = await request(app)
				.get('/user/me')
				.set('Authorization', invalidTokenCases[1]);

			expect(response.body.message).toBe('Token not found');
		});

		it('should respond with correct message in case of invalid token', async () => {
			const response = await request(app)
				.get('/user/me')
				.set('Authorization', invalidTokenCases[0]);

			expect(response.body.message).toBe('Expired or invalid token');
		});
	});
});
