import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createPost, getPostsList } from "../services/post.service";
import { IPost } from "../interfaces/IPost";

export const getAllPosts = async (req: Request, res: Response) => {
	const response = await getPostsList();

	res.status(StatusCodes.OK).json(response);
};

export const createNewPost = async (
	req: Request<unknown, unknown, IPost>,
	res: Response
) => {
	const { id } = res.locals.payload;
	const response = await createPost(id, req.body);

	res.status(StatusCodes.CREATED).json(response);
};
