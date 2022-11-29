import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";
import { seedDB } from "../../prisma/test-setup";

describe("GET /users", () => {
	beforeAll(() => {
		seedDB();
	});

	describe("Users with valid token", () => {
		it("should respond with status code 200", async () => {});

		it("should return a list of users", async () => {});
	});

	describe("With invalid authorization field", () => {
		it("should respond with status code 401", async () => {});

		it("should respond with correct message in case of empty token", async () => {});

		it("should respond with correct message in case of invalid token", async () => {});
	});
});
