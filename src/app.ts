import express from "express";
import routers from "./routers";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(routers);

export default app;
