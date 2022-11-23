import express from "express";
import loginRouter from "./login.router";

const routers = express.Router();

routers.use("/login", loginRouter);

export default routers;
