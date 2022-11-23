import express from "express";
import prisma from "../db";
import { StatusCodes } from "http-status-codes";

const routers = express.Router();

routers.post("/", async (req, res) => {
	if (!req.body.password || !req.body.email) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.send({ message: "Some required fields are missing" });
	}

	const user = await prisma.user.findFirst({
		where: {
			email: req.body.email,
			password: req.body.password,
		},
	});

	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Invalid Fields",
		});
	}
	res.send({ token: "teste" });
});

export default routers;
