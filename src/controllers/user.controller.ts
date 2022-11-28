import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
	const token = await registerUser(req.body);
	console.log("token?", token);
	res.status(StatusCodes.CREATED).json({ token });
};
