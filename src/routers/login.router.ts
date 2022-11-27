import express from "express";
import prisma from "../db";
import { StatusCodes } from "http-status-codes";
import { comparePasswords, createToken } from "../utils/auth";

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
		},
		select: {
			displayName: true,
			email: true,
			id: true,
			password: true,
		},
	});

	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Invalid email or password",
		});
	}

	const isValid = await comparePasswords(req.body.password, user.password);

	if (!isValid) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Invalid email or password",
		});
	}

	const payload = {
		displayName: user.displayName,
		email: user.email,
		id: user.id,
	};
	console.log(payload);
	const token = await createToken(payload);
	res.send({ token });
});

export default routers;
