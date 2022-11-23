import request from "supertest";
import app from "../app";
import { StatusCodes } from "http-status-codes";

const validData = {
	email: "lewishamilton@gmail.com",
	password: "123456",
};
const emptyFieldsData = [{ email: "" }, { password: "" }, {}];
const data = { email: "email", password: "password" };

describe("POST /login", () => {
	describe("With adequate email and password", () => {
		it("should respond with status code 200", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.statusCode).toBe(StatusCodes.OK);
		});

		it("should respond with json type header", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.headers["content-type"]).toEqual(
				expect.stringContaining("json")
			);
		});

		it("should return a token", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.body.token).toBeDefined();
		});

		it("should return a valid token", async () => {
			const response = await request(app).post("/login").send(validData);

			expect(response.body).toEqual({
				token: "teste",
			});
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
			const response = await request(app).post("/login").send(data);

			expect(response.body).toEqual({
				message: "Invalid Fields",
			});
		});
	});
});
