import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { seedDB } from "../../prisma/test-setup";
import {
	lewisLogindata,
	missingFieldsData,
	invalidUserData,
	invalidPasswordData,
} from "./mocks/loginMockData";

describe("POST /login", () => {
	beforeAll(() => {
		seedDB();
	});

	describe("Login with adequate email and password", () => {
		it("should respond with status code 200", async () => {
			const response = await request(app).post("/login").send(lewisLogindata);

			expect(response.statusCode).toBe(StatusCodes.OK);
		});

		it("should return a token", async () => {
			const response = await request(app).post("/login").send(lewisLogindata);

			expect(response.body.token).toBeDefined();
		});
	});

	describe("With inadequate email and password", () => {
		it("should respond with status code 400", async () => {
			for (const body of missingFieldsData) {
				const response = await request(app).post("/login").send(body);

				expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
			}
		});

		it("should respond with correct error message in case of missing fields", async () => {
			for (const body of missingFieldsData) {
				const response = await request(app).post("/login").send(body);

				expect(response.body.message).toBe("Some required fields are missing");
			}
		});

		it("should respond with correct error message in case of invalid user", async () => {
			const response = await request(app).post("/login").send(invalidUserData);

			expect(response.body.message).toBe("Invalid email or password");
		});

		it("should respond with correct error message in case of invalid password", async () => {
			const response = await request(app)
				.post("/login")
				.send(invalidPasswordData);

			expect(response.body.message).toBe("Invalid email or password");
		});
	});
});
