import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/user.service";
import { IUser } from "../interfaces/IUser";
import { getUsersList, getOneUser, removeUser } from "../services/user.service";

export const getAllUsers = async (_req: Request, res: Response) => {
	const response = await getUsersList();

	res.status(StatusCodes.OK).json(response);
};

export const getUserById = async (req: Request, res: Response) => {
	const response = await getOneUser(+req.params.id);

	res.status(StatusCodes.OK).json(response);
};

export const createUser = async (
	req: Request<unknown, unknown, IUser>,
	res: Response
) => {
	const token = await registerUser(req.body);
	res.status(StatusCodes.CREATED).json({ token });
};

export const deleteUserById = async (req: Request, res: Response) => {
	const { email } = res.locals.payload;

	await removeUser(email);
	res.status(StatusCodes.NO_CONTENT).end();
};
