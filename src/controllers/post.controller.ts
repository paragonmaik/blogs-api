import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost } from "../services/post.service";
import { IPost } from "../interfaces/IPost";

export const createNewPost = async (
	req: Request<unknown, unknown, IPost>,
	res: Response
) => {
	if (!req.body.title || !req.body.content || !req.body.categoryId) {
		res.status(StatusCodes.BAD_REQUEST).json({
			message: "Some required fields are missing",
		});
	}

	const { id } = res.locals.payload;
	const response = await createPost(id, req.body);

	if (!response) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: '"categoryId" not found',
		});
	}

	console.log(response);
	res.status(StatusCodes.CREATED).json(response);
};
