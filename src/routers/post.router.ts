import express from "express";
import { PostSchema } from "../middlewares/joiSchemas/post.schema";
import { validateSchema } from "../middlewares/validateSchemas";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { createNewPost } from "../controllers/post.controller";
require("express-async-errors");

const routers = express.Router();

routers.get("/", authenticationMiddleware);
routers.post(
	"/",
	authenticationMiddleware,
	validateSchema(PostSchema),
	createNewPost
);

export default routers;
