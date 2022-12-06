import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { lewisLogindata } from "./mocks/loginMockData";

const categoriesList = [
	{ id: 1, name: "Inovação" },
	{ id: 2, name: "Escola" },
];

describe("POST /categories", () => {
	describe("Categories with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const response = await request(app)
				.get("/categories")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return a list of categories", async () => {
			const loginResponse = await request(app)
				.post("/login")
				.send(lewisLogindata);

			const categories = await request(app)
				.get("/categories")
				.set("Authorization", loginResponse.body.token);

			categoriesList.forEach((category, i) => {
				expect(categories.body[i].id).toBe(category.id);
				expect(categories.body[i].name).toBe(category.name);
			});
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get("/categories")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.get("/categories")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.get("/categories")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
