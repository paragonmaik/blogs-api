import prisma from '../db';
import { IPost } from '../interfaces/IPost';
import { HttpException } from '../middlewares/HttpException';
import { StatusCodes } from 'http-status-codes';

export const getPostsList = async () =>
	await prisma.blogPost.findMany({
		include: {
			user: {
				select: {
					id: true,
					displayName: true,
					email: true,
					image: true,
				},
			},
		},
	});

export const getOnePost = async (id: number) => {
	const post = await prisma.blogPost.findUnique({
		where: {
			id,
		},
		include: {
			user: {
				select: {
					id: true,
					displayName: true,
					email: true,
					image: true,
				},
			},
		},
	});

	if (!post) {
		throw new HttpException(StatusCodes.NOT_FOUND, 'Post does not exist');
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

export const updatePost = async (
	id: number,
	userId: number,
	{ title, content }: any
) => {
	const post = await prisma.blogPost.findFirst({
		where: {
			id,
			userId,
		},
	});
	if (!post) {
		throw new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized user');
	}

	const editedPost = await prisma.blogPost.update({
		where: {
			id,
		},
		data: {
			title,
			content,
		},
		include: {
			user: {
				select: {
					id: true,
					displayName: true,
					email: true,
					image: true,
				},
			},
		},
	});

	return editedPost;
};
