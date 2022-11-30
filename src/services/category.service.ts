import prisma from "../db";

export const registerCategory = async (name: string) => {
	const category = await prisma.category.create({
		data: {
			name,
		},
	});

	return category;
};
