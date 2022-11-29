import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/user.service";
import { IUser } from "../interfaces/IUser";
import { authToken } from "../utils/auth";
import { getUsersList } from "../services/user.service";

export const getAllUsers = async (req: Request, res: Response) => {
	const token = req.headers.authorization;
	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "Token not found" });
	}
	const payload = await authToken(token);
	if (typeof payload === "string") {
		return { message: "teste" };
	}
	res.locals.payload = payload;

	if (payload.status === 401) {
		return res.status(payload.status).json({ message: payload.message });
	}
	const response = await getUsersList();
	res.status(StatusCodes.OK).json(response);
};

export const createUser = async (
	req: Request<unknown, unknown, IUser>,
	res: Response
) => {
	const token = await registerUser(req.body);
	res.status(StatusCodes.CREATED).json({ token });
};
