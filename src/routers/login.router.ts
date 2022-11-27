import express from "express";
import { userLogin } from "../controllers/login.controller";
import { LoginSchema } from "../middlewares/joiSchemas/login.schema";
import { validateSchema } from "../middlewares/validateSchemas";
require("express-async-errors");

const routers = express.Router();

routers.post("/", validateSchema(LoginSchema), userLogin);

export default routers;
