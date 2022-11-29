import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/user.service";
import { IUser } from "../interfaces/IUser";
import { getUsersList } from "../services/user.service";

export const getAllUsers = async (_req: Request, res: Response) => {
	const response = await getUsersList();

	res.status(StatusCodes.OK).json(response);
};

export const getUserById = async (_req: Request, res: Response) => {};

export const createUser = async (
	req: Request<unknown, unknown, IUser>,
	res: Response
) => {
	const token = await registerUser(req.body);
	res.status(StatusCodes.CREATED).json({ token });
};
