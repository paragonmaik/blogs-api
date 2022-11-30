import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db";

export const createCategory = async (req: Request, res: Response) => {
	const category = await prisma.category.create({
		data: {
			name: req.body.name,
		},
	});

	res.status(StatusCodes.CREATED).json(category);
};
