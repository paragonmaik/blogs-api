import express from "express";
import loginRouter from "./login.router";
import userRouter from "./user.router";
import categoryRouter from "./category.router";
import postRouter from "./post.router";

const routers = express.Router();

routers.use("/login", loginRouter);
routers.use("/user", userRouter);
routers.use("/categories", categoryRouter);
routers.use("post", postRouter);

export default routers;
