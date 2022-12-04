import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { loginData } from "./mocks/loginMockData";

describe("GET /post", () => {
	describe("Users with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const response = await request(app)
				.get("/post")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return a list of users", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const posts = await request(app)
				.get("/post")
				.set("Authorization", loginResponse.body.token);

			for (const post of posts.body) {
				expect(post.id).toBeDefined();
				expect(post.title).toBeDefined();
				expect(post.content).toBeDefined();
				expect(post.userId).toBeDefined();
				expect(post.published).toBeDefined();
				expect(post.updated).toBeDefined();
				expect(post.user).toBeDefined();
				expect(post.user.password).toBeUndefined();
			}
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get("/post")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.get("/post")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.get("/post")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
