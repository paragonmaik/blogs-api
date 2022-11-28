import express from "express";
import { createUser } from "../controllers/user.controller";
import { UserSchema } from "../middlewares/joiSchemas/user.schema";
import { validateSchema } from "../middlewares/validateSchemas";
require("express-async-errors");

const routers = express.Router();

routers.post("/", validateSchema(UserSchema), createUser);

export default routers;
