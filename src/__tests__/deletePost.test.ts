import request from 'supertest';
import app from '../app';
import prisma from '../db';
import { StatusCodes } from 'http-status-codes';
import { seedDB } from '../../prisma/test-setup';
import { lewisLogindata, michaelLoginData } from './mocks/loginMockData';

describe('DELETE /post/:id', () => {
	beforeAll(() => {
		seedDB();
	});

	describe('With valid token', () => {
		it('should respond with status code 204', async () => {
			const loginResponse = await request(app)
				.post('/login')
				.send(lewisLogindata);

			const response = await request(app)
				.delete('/post/1')
				.set('Authorization', loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.NO_CONTENT);
		});

		it('should not be able to find post in the database', async () => {
			const deletedPost = await prisma.blogPost.findUnique({
				where: {
					id: 1,
				},
			});

			expect(deletedPost).toBeNull();
		});
	});

	describe('With invalid data', () => {
		it('should respond with status code 404 and correct error message', async () => {
			const loginResponse = await request(app)
				.post('/login')
				.send(lewisLogindata);

			const response = await request(app)
				.delete('/post/10')
				.set('Authorization', loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
			expect(response.body.message).toBe('Post does not exist');
		});
	});

	describe('With invalid token', () => {
		const invalidTokenCases = ['invalid-token', ''];

		it('should respond with status code 401', async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.delete('/post/1')
					.set('Authorization', token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it('should respond with correct message in case of empty token', async () => {
			const response = await request(app)
				.delete('/post/1')
				.set('Authorization', invalidTokenCases[1]);

			expect(response.body.message).toBe('Token not found');
		});

		it('should respond with correct message in case of invalid token', async () => {
			const response = await request(app)
				.delete('/post/1')
				.set('Authorization', invalidTokenCases[0]);

			expect(response.body.message).toBe('Expired or invalid token');
		});
	});
});
