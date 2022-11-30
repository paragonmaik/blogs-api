import Joi from "joi";

export const CategorySchema = Joi.object({
	name: Joi.string().required(),
}).messages({
	"any.required": "{{#label}} is required",
});
