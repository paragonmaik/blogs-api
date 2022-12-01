import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createNewPost = async (req: Request, res: Response) => {
	if (!req.body.title || !req.body.content || !req.body.categoryIds) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message: "Some required fields are missing",
		});
	}

	res.status(StatusCodes.BAD_REQUEST).json({
		message: '"categoryIds" not found',
	});
};
