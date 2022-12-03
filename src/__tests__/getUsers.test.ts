import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { usersList } from "./mocks/userMockData";
import { loginData } from "./mocks/loginMockData";

describe("GET /user", () => {
	describe("Users with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const response = await request(app)
				.get("/user")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return a list of users", async () => {
			const loginResponse = await request(app).post("/login").send(loginData);

			const users = await request(app)
				.get("/user")
				.set("Authorization", loginResponse.body.token);

			usersList.forEach((user, i) => {
				expect(users.body[i].displayName).toBe(user.displayName);
				expect(users.body[i].email).toBe(user.email);
				expect(users.body[i].image).toBe(user.image);
			});
		});
	});

	describe("With invalid token", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get("/user")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.get("/user")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.get("/user")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
