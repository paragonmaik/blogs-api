import express from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
require("express-async-errors");

const routers = express.Router();

routers.post("/");

export default routers;
