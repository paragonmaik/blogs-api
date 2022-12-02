import Joi from "joi";

export const PostSchema = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	categoryId: Joi.array().optional(),
}).messages({
	"string.empty": "Some required fields are missing",
});
