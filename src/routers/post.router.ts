import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { createNewPost } from "../controllers/post.controller";
require("express-async-errors");

const routers = express.Router();

routers.post("/", authenticationMiddleware, createNewPost);

export default routers;
