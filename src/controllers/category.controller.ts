import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db";

export const createCategory = async (req: Request, res: Response) => {
	if (!req.body.name) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: '"name" is required',
		});
	}
	const category = await prisma.category.create({
		data: {
			name: req.body.name,
		},
	});

	res.status(StatusCodes.CREATED).json(category);
};
