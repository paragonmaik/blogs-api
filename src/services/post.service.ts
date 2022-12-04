import prisma from "../db";
import { IPost } from "../interfaces/IPost";
import { HttpException } from "../middlewares/HttpException";
import { StatusCodes } from "http-status-codes";

export const getPostsList = async () =>
	await prisma.blogPost.findMany({
		include: {
			user: true,
		},
	});

export const getOnePost = async (id: number) => {
	const post = await prisma.blogPost.findUnique({
		where: {
			id,
		},
	});

	if (!post) {
		throw new HttpException(StatusCodes.NOT_FOUND, "Post does not exist");
	}

	return post;
};

export const createPost = async (
	userId: number,
	{ title, content, categoryId }: IPost
) => {
	const category = await prisma.category.findMany({
		where: {
			id: {
				in: categoryId,
			},
		},
	});

	if (category.length === 0) {
		throw new HttpException(StatusCodes.BAD_REQUEST, '"categoryId" not found');
	}

	const newPost = await prisma.blogPost.create({
		data: {
			title,
			content,
			userId,
		},
	});

	categoryId.forEach(async (catId) => {
		await prisma.postCategory.create({
			data: {
				postId: newPost.id,
				categoryId: catId,
			},
		});
	});

	return newPost;
};
