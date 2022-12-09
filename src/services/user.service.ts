import { createToken, hashPassword } from '../utils/auth';
import { IUser } from '../interfaces/IUser';
import { HttpException } from '../middlewares/HttpException';
import prisma from '../db';
import { StatusCodes } from 'http-status-codes';

export const getUsersList = async () =>
	await prisma.user.findMany({
		select: {
			displayName: true,
			image: true,
			email: true,
		},
	});

export const getOneUser = async (id: number) => {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		select: {
			displayName: true,
			image: true,
			email: true,
		},
	});

	if (!user) {
		throw new HttpException(StatusCodes.NOT_FOUND, 'User does not exist');
	}

	return user;
};

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
		throw new HttpException(StatusCodes.CONFLICT, 'User already registered');
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

export const removeUser = async (email: string) => {
	// refatorar, response não precisa ser retornado
	const response = await prisma.user.delete({
		where: {
			email,
		},
	});

	return response;
};
