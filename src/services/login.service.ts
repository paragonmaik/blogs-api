import { StatusCodes } from "http-status-codes";
import prisma from "../db";
import { ILogin } from "../interfaces/ILogin";
import { HttpException } from "../middlewares/HttpException";
import { createToken, comparePasswords } from "../utils/auth";

export const authUser = async ({ email, password }: ILogin) => {
	const user = await prisma.user.findFirst({
		where: {
			email: email,
		},
		select: {
			displayName: true,
			email: true,
			id: true,
			password: true,
		},
	});

	if (!user) {
		throw new HttpException(
			StatusCodes.BAD_REQUEST,
			"Invalid email or password"
		);
	}

	const isValid = await comparePasswords(password, user.password);

	if (!isValid) {
		throw new HttpException(
			StatusCodes.BAD_REQUEST,
			"Invalid email or password"
		);
	}

	const payload = {
		displayName: user.displayName,
		email: user.email,
		id: user.id,
	};
	const token = await createToken(payload);
	return token;
};
