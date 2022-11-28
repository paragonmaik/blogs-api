import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { validData } from "./mocks/userMockData";

describe("POST /user", () => {
	describe("Create user with adequate displayName, email, password and image fields", () => {
		it("should respond with status code 200", async () => {
			const response = await request(app).post("/user").send(validData);

			expect(response.statusCode).toBe(StatusCodes.CREATED);
		});

		it("should return a token", async () => {
			const response = await request(app).post("/user").send(validData);

			expect(response.body.token).toBeDefined();
		});
	});
});
