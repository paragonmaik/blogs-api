import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";

describe("GET /post", () => {
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