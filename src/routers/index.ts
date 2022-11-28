import express from "express";
import loginRouter from "./login.router";
import userRouter from "./user.router";

const routers = express.Router();

routers.use("/login", loginRouter);
routers.use("/user", userRouter);

export default routers;
