import Joi from "joi";

export const LoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
}).messages({
	"string.empty": "Some required fields are missing",
	"any.required": "Some required fields are missing",
});
