import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { usersList } from "./mocks/userMockData";

describe("GET /users/:id", () => {
	describe("User with valid token", () => {
		it("should respond with status code 200", async () => {
			const loginResponse = await request(app).post("/login").send({
				email: usersList[0].email,
				password: "123456",
			});

			const response = await request(app)
				.get("/user/2")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.OK);
		});

		it("should return the correct user", async () => {
			const loginResponse = await request(app).post("/login").send({
				email: usersList[0].email,
				password: "123456",
			});
			const user = await request(app)
				.get("/user/2")
				.set("Authorization", loginResponse.body.token);

			expect(user.body.displayName).toBe(usersList[1].displayName);
			expect(user.body.email).toBe(usersList[1].email);
			expect(user.body.image).toBe(usersList[1].image);
		});
	});

	describe("With invalid id", () => {
		it("should respond with status code 404", async () => {
			const loginResponse = await request(app).post("/login").send({
				email: usersList[0].email,
				password: "123456",
			});

			const response = await request(app)
				.get("/user/3")
				.set("Authorization", loginResponse.body.token);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
		});

		it("should respond with correct message in case of invalid id", async () => {
			const loginResponse = await request(app).post("/login").send({
				email: usersList[0].email,
				password: "123456",
			});

			const response = await request(app)
				.get("/user/3")
				.set("Authorization", loginResponse.body.token);

			expect(response.body.message).toBe("User does not exist");
		});
	});

	describe("With invalid authorization field", () => {
		const invalidTokenCases = ["invalid-token", ""];

		it("should respond with status code 401", async () => {
			for (const token of invalidTokenCases) {
				const response = await request(app)
					.get("/user/2")
					.set("Authorization", token);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			}
		});

		it("should respond with correct message in case of empty token", async () => {
			const response = await request(app)
				.get("/user/2")
				.set("Authorization", invalidTokenCases[1]);

			expect(response.body.message).toBe("Token not found");
		});

		it("should respond with correct message in case of invalid token", async () => {
			const response = await request(app)
				.get("/user/2")
				.set("Authorization", invalidTokenCases[0]);

			expect(response.body.message).toBe("Expired or invalid token");
		});
	});
});
