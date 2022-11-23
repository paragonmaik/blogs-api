import express from "express";
import { StatusCodes } from "http-status-codes";

const routers = express.Router();

routers.post("/", (req, res) => {
	if (!req.body.password || !req.body.email)
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ message: "Some required fields are missing" });
	res.send({ token: "" });
});

export default routers;
