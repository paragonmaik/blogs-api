import prisma from "../db";
import { IPost } from "../interfaces/IPost";

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
		return null;
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
