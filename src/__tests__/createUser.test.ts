import request from "supertest";
import app from "../app";
import prisma from "../db";
import { StatusCodes } from "http-status-codes";
import { seedDB } from "../../prisma/test-setup";
import {
	validData,
	emptyFieldsData,
	incorrectDisplayNameLength,
	incorrectPasswordLength,
	invalidEmail,
	alreadyRegisteredUser,
} from "./mocks/userMockData";

describe("POST /user", () => {
	beforeAll(() => {
		seedDB();
	});
	describe("Create user with adequate displayName, email, password and image fields", () => {
		it("should respond with status code 201", async () => {
			const response = await request(app).post("/user").send(validData);
			const newlyCreatedUser = await prisma.user.findFirst({
				where: {
					email: validData.email,
				},
			});
			expect(response.statusCode).toBe(StatusCodes.CREATED);
			expect(newlyCreatedUser).toBeTruthy();
			expect(response.body.token).toBeDefined();
		});
	});

	describe("Request with inadequate data", () => {
		it("should respond with status code 400", async () => {
			for (const body of emptyFieldsData) {
				const response = await request(app).post("/user").send(body);

				expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
			}
		});

		it("should respond with correct error message in case of missing fields", async () => {
			for (const body of emptyFieldsData) {
				const response = await request(app).post("/user").send(body);

				expect(response.body.message).toBe("Some required fields are missing");
			}
		});

		it("should respond with correct error message in case of incorrect displayName length", async () => {
			const response = await request(app)
				.post("/user")
				.send(incorrectDisplayNameLength);

			expect(response.body.message).toBe(
				'"displayName" length must be at least 8 characters long'
			);
		});

		it("should respond with correct error message in case of incorrect password length", async () => {
			const response = await request(app)
				.post("/user")
				.send(incorrectPasswordLength);

			expect(response.body.message).toBe(
				'"password" length must be at least 6 characters long'
			);
		});

		it("should respond with correct error message in case of invalid email", async () => {
			const response = await request(app).post("/user").send(invalidEmail);

			expect(response.body.message).toBe('"email" must be a valid email');
		});
	});

	describe("Request with existing user", () => {
		it("should respond with status code 409", async () => {
			const response = await request(app)
				.post("/user")
				.send(alreadyRegisteredUser);

			expect(response.statusCode).toBe(StatusCodes.CONFLICT);
		});

		it("should respond with correct error message in case of already registered user", async () => {
			const response = await request(app)
				.post("/user")
				.send(alreadyRegisteredUser);
			expect(response.body.message).toBe("User already registered");
		});
	});
});
