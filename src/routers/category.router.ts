import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import {
	createCategory,
	getAllCategories,
} from "../controllers/category.controller";
import { validateSchema } from "../middlewares/validateSchemas";
import { CategorySchema } from "../middlewares/joiSchemas/category.schema";
require("express-async-errors");

const routers = express.Router();

routers.get("/", authenticationMiddleware, getAllCategories);
routers.post(
	"/",
	authenticationMiddleware,
	validateSchema(CategorySchema),
	createCategory
);

export default routers;
