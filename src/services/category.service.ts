import prisma from "../db";

export const getCategoriesList = async () => await prisma.category.findMany();

export const registerCategory = async (name: string) => {
	const category = await prisma.category.create({
		data: {
			name,
		},
	});

	return category;
};
