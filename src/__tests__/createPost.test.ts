import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { seedDB } from "../../prisma/test-setup";
import { loginData } from "./mocks/loginMockData";
import {
	firstValidPost,
	secondValidPost,
	newPostWithInvalidId,
	invalidNewPost,
} from "./mocks/postMockData";

describe("POST /post", () => {
	beforeAll(() => {
		seedDB();
	});
	describe("Create user with correct displayName, email, password and image fields", () => {
		it("should respond with status code 201", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const response = await request(app)
				.post("/post")
				.send(firstValidPost)
				.set("Authorization", loginResponse.body.token);

			expect(response.statusCode).toBe(StatusCodes.CREATED);
		});

		it("should respond with created category data", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const response = await request(app)
				.post("/post")
				.send(secondValidPost)
				.set("Authorization", loginResponse.body.token);

			console.log(response.body);
			expect(response.body.id).toBeDefined();
			expect(response.body.title).toBeDefined();
			expect(response.body.content).toBeDefined();
			expect(response.body.userId).toBeDefined();
			expect(response.body.updated).toBeDefined();
			expect(response.body.published).toBeDefined();
		});
	});

	describe("Request with incorrect data", () => {
		it("should respond with status code 400", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const response = await request(app)
				.post("/post")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
		});

		it("should respond with correct error message in case of missing fields", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);
			const response = await request(app)
				.post("/post")
				.send(invalidNewPost)
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe("Some required fields are missing");
		});

		it("should respond with correct error message in case of invalid categoryId", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);
			const response = await request(app)
				.post("/post")
				.send(newPostWithInvalidId)
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe('"categoryId" not found');
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.post("/post")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.post("/post")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.post("/post")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
