import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { createCategory } from "../controllers/category.controller";
require("express-async-errors");

const routers = express.Router();
routers.post("/", authenticationMiddleware, createCategory);

export default routers;
