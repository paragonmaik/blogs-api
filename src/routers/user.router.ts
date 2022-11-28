import express from "express";
import { createUser } from "../controllers/user.controller";
require("express-async-errors");

const routers = express.Router();

routers.post("/", createUser);

export default routers;
