import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";
import { UserSchema } from "../middlewares/joiSchemas/user.schema";
import { validateSchema } from "../middlewares/validateSchemas";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
require("express-async-errors");

const routers = express.Router();

routers.get("/", authenticationMiddleware, getAllUsers);
routers.post("/", validateSchema(UserSchema), createUser);

export default routers;
