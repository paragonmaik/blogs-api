import { PrismaClient } from "@prisma/client";
import { users } from "./seeders/users";
import { categories } from "./seeders/categories";
import { blogPosts } from "./seeders/blogPosts";
import { postCategories } from "./seeders/postCategories";

const prisma = new PrismaClient();

async function main() {
	for (const user of users) {
		await prisma.user.create({
			data: user,
		});
	}

	for (const blogPost of blogPosts) {
		await prisma.blogPost.create({
			data: blogPost,
		});
	}

	for (const category of categories) {
		await prisma.category.create({
			data: category,
		});
	}

	for (const postCategory of postCategories) {
		await prisma.postCategory.create({
			data: postCategory,
		});
	}
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
