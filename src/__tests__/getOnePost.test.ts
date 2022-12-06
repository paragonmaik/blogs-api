import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { lewisLogindata } from "./mocks/loginMockData";

describe("GET /post/:id", () => {
	describe("Users with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.get("/post/1")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return one post", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const post = await request(app)
				.get("/post/1")
				.set("Authorization", loginResponse.body.token);

			expect(post.body.id).toBeDefined();
			expect(post.body.title).toBeDefined();
			expect(post.body.content).toBeDefined();
			expect(post.body.userId).toBeDefined();
			expect(post.body.published).toBeDefined();
			expect(post.body.updated).toBeDefined();
			expect(post.body.user).toBeDefined();
			expect(post.body.user.password).toBeUndefined();
		});
	});

	describe("With invalid id", () => {
		it("should respond with status code 404", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.get("/post/300")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
		});

		it("should respond with correct message in case of invalid id", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.get("/post/300")
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe("Post does not exist");
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get("/post/1")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.get("/post/1")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.get("/post/1")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
