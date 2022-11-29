import { createToken, hashPassword } from "../utils/auth";
import { IUser } from "../interfaces/IUser";
import { HttpException } from "../middlewares/HttpException";
import prisma from "../db";
import { StatusCodes } from "http-status-codes";

export const getUsersList = () =>
	prisma.user.findMany({
		select: {
			displayName: true,
			image: true,
			email: true,
		},
	});

export const registerUser = async (user: IUser) => {
	const findUserResponse = await prisma.user.findUnique({
		where: {
			email: user.email,
		},
		select: {
			email: true,
		},
	});

	if (findUserResponse) {
		throw new HttpException(StatusCodes.CONFLICT, "User already registered");
	}
	const payload = await prisma.user.create({
		data: {
			displayName: user.displayName,
			email: user.email,
			password: await hashPassword(user.password),
			image: user.image,
		},
		select: {
			id: true,
		},
	});

	const token = createToken({ ...user, id: payload.id });
	return token;
};
