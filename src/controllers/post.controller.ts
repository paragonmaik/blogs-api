import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
	createPost,
	getPostsList,
	getOnePost,
	updatePost,
	deletePost,
} from '../services/post.service';
import { IPost } from '../interfaces/IPost';

export const getAllPosts = async (_req: Request, res: Response) => {
	const response = await getPostsList();

	res.status(StatusCodes.OK).json(response);
};

export const getPostById = async (req: Request, res: Response) => {
	const response = await getOnePost(+req.params.id);

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

export const editPost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = res.locals.payload.id;
	const { title, content } = req.body;

	const response = await updatePost(+id, +userId, { title, content });
	res.status(StatusCodes.OK).json(response);
};

export const deletePostById = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = res.locals.payload.id;

	await deletePost(+id, +userId);
	res.status(StatusCodes.NO_CONTENT).end();
};
