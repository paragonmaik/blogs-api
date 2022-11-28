import Joi from "joi";

export const UserSchema = Joi.object({
	displayName: Joi.string().required().min(8),
	password: Joi.string().required().min(6),
	image: Joi.string().required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
}).messages({
	"string.empty": "Some required fields are missing",
	"displayName.min": "{{#label}} length must be at least 8 characters long",
	"password.min": "{{#label}} length must be at least 8 characters long",
});
