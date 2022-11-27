import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ILogin } from "../interfaces/ILogin";
import { authUser } from "../services/login.service";

export const userLogin = async (
	req: Request<unknown, unknown, ILogin>,
	res: Response
) => {
	const token = await authUser(req.body);

	res.status(StatusCodes.OK).json({ token });
};
