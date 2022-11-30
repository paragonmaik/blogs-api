import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
	registerCategory,
	getCategoriesList,
} from "../services/category.service";

export const getAllCategories = async (req: Request, res: Response) => {
	const response = await getCategoriesList();

	res.status(StatusCodes.OK).json(response);
};

export const createCategory = async (req: Request, res: Response) => {
	const response = await registerCategory(req.body.name);

	res.status(StatusCodes.CREATED).json(response);
};
