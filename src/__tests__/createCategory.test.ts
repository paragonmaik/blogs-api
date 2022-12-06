import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { lewisLogindata } from "./mocks/loginMockData";
import { seedDB } from "../../prisma/test-setup";

const firstCategory = { name: "TypeScript" };
const secondCategory = { name: "C++" };

describe("POST /categories", () => {
	beforeAll(() => {
		seedDB();
	});

	describe("Categories with valid token", () => {
		it("should respond with status code 201", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.post("/categories")
				.send(firstCategory)
				.set("Authorization", loginResponse.body.token);

			expect(response.statusCode).toBe(StatusCodes.CREATED);
		});

		it("should respond with created category data", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.post("/categories")
				.send(secondCategory)
				.set("Authorization", loginResponse.body.token);

			expect(response.body.id).toBeDefined();
			expect(response.body.name).toBe(secondCategory.name);
		});

		it("should respond with status code 400", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.post("/categories")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
		});

		it("should respond with with correct error message", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.post("/categories")
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe('"name" is required');
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.post("/categories")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.post("/categories")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.post("/categories")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
