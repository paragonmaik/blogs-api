import express from "express";
import { UserSchema } from "../middlewares/joiSchemas/user.schema";
import { validateSchema } from "../middlewares/validateSchemas";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import {
	createUser,
	getAllUsers,
	getUserById,
	deleteUserById,
} from "../controllers/user.controller";
require("express-async-errors");

const routers = express.Router();

routers.get("/", authenticationMiddleware, getAllUsers);
routers.get("/:id", authenticationMiddleware, getUserById);
routers.post("/", validateSchema(UserSchema), createUser);
routers.delete("/me", authenticationMiddleware, deleteUserById);

export default routers;
