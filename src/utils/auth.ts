import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../interfaces/IJWTPayload";

const SECRET = process.env.JWT_SECRET || "secret_key";

export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
};

export const comparePasswords = (password: string, hashedPassword: string) => {
	return bcrypt.compare(password, hashedPassword);
};

export const createToken = (payload: IJWTPayload) => jwt.sign(payload, SECRET);

export const authToken = async (token: string) => {
	if (!token) {
		return { status: 401, message: "Token not found" };
	}

	try {
		const introspection = await jwt.verify(token, SECRET);
		return introspection;
	} catch (e) {
		return { status: 401, message: "Expired or invalid token" };
	}
};
