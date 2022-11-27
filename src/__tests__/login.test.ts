import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { seedDB } from "../../prisma/test-setup";
import {
	validData,
	emptyFieldsData,
	invalidUserData,
	invalidPasswordData,
} from "./mocks/loginMockData";

describe("POST /login", () => {
	beforeAll(() => {
		seedDB();
	});

	describe("With adequate email and password", () => {
		it("should respond with status code 200", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.statusCode).toBe(StatusCodes.OK);
		});

		it("should return a token", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.body.token).toBeDefined();
		});
	});

	describe("With inadequate email and password", () => {
		it("should respond with status code 400", async () => {
			for (const body of emptyFieldsData) {
				const response = await request(app).post("/login").send(body);

				expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
			}
		});

		it("should respond with correct error message in case of missing fields", async () => {
			for (const body of emptyFieldsData) {
				const response = await request(app).post("/login").send(body);

				expect(response.body).toEqual({
					message: "Some required fields are missing",
				});
			}
		});

		it("should respond with correct error message in case of invalid user", async () => {
			const response = await request(app).post("/login").send(invalidUserData);

			expect(response.body).toEqual({
				message: "Invalid email or password",
			});
		});

		it("should respond with correct error message in case of invalid password", async () => {
			const response = await request(app)
				.post("/login")
				.send(invalidPasswordData);

			expect(response.body).toEqual({
				message: "Invalid email or password",
			});
		});
	});
});
