import express from "express";
import routers from "./routers";
import morgan from "morgan";
import { ErrorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(routers);
app.use(ErrorHandler);

export default app;
