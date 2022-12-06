import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { lewisLogindata, michaelLoginData } from "./mocks/loginMockData";
import { invalidEditPostData, editPostData } from "./mocks/postMockData";

describe("PUT /post/:id", () => {
	describe("Users with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.put("/post/1")
				.send(editPostData)
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return one edited post", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const post = await request(app)
				.put("/post/1")
				.send(editPostData)
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

	describe("Request with unauthorized user", () => {
		it("should respond with status code 401", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(michaelLoginData);

			const response = await request(app)
				.put("/post/1")
				.send(editPostData)
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
		});

		it("should respond with correct error message in case of unauthorized user", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(michaelLoginData);

			const response = await request(app)
				.put("/post/1")
				.send(editPostData)
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe("Unauthorized user");
		});
	});

	describe("Request with incorrect data", () => {
		it("should respond with status code 400", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.put("/post/1")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
		});

		it("should respond with correct error message in case of missing fields", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);
			const response = await request(app)
				.put("/post/1")
				.send(invalidEditPostData)
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe("Some required fields are missing");
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.put("/post/1")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.put("/post/1")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.put("/post/1")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
