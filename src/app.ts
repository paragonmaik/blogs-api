import express from "express";
import routers from "./routers";
import morgan from "morgan";
import cors from "cors";
import { ErrorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routers);
app.use(ErrorHandler);

export default app;
