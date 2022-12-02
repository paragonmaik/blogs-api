import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost } from "../services/post.service";
import { IPost } from "../interfaces/IPost";

export const createNewPost = async (
	req: Request<unknown, unknown, IPost>,
	res: Response
) => {
	const { id } = res.locals.payload;
	const response = await createPost(id, req.body);

	res.status(StatusCodes.CREATED).json(response);
};
