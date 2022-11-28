import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createUser = async (req: Request, res: Response) => {
	res.status(StatusCodes.CREATED).json({ token: "teste" });
};
