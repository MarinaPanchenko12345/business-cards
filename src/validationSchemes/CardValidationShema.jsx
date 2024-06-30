import Joi from "joi";
import { getNames } from "country-list";

const countries = getNames();

export const CardValidationSchema = Joi.object({
  title: Joi.string().min(2).max(256).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title must be at most 256 characters long",
    "any.required": "Title is required",
  }),
  subtitle: Joi.string().min(2).max(256).required().messages({
    "string.base": "Subtitle must be a string",
    "string.empty": "Subtitle cannot be empty",
    "string.min": "Subtitle must be at least 2 characters long",
    "string.max": "Subtitle must be at most 256 characters long",
    "any.required": "Subtitle is required",
  }),
  description: Joi.string().min(2).max(1024).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 2 characters long",
    "string.max": "Description must be at most 1024 characters long",
    "any.required": "Description is required",
  }),
  phone: Joi.string()
    .pattern(/^((\+972|972|0)( ?-?[0-9]{1,2})( ?-?[0-9]{3})( ?-?[0-9]{4}))$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a standard Israeli phone number",
      "string.empty": "Phone cannot be empty",
      "any.required": "Phone is required",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .required()
    .messages({
      "string.email": "Email must be a standard email",
      "string.empty": "Email cannot be empty",
      "string.min": "Email must be at least 5 characters long",
      "any.required": "Email is required",
    }),
  web: Joi.string().uri().min(14).optional().allow("", null).messages({
    "string.uri": "Web must be a standard URL",
    "string.min": "Web must be at least 14 characters long",
  }),

  image: Joi.object({
    url: Joi.string().uri().min(14).max(256).required().messages({
      "string.uri": "Image URL must be a standard URL",
      "string.min": "Image URL must be at least 14 characters long",
      "string.max": "Image URL must be at most 256 characters long",
      "any.required": "Image URL is required",
    }),
    alt: Joi.string().min(2).max(256).required().messages({
      "string.base": "Image alt must be a string",
      "string.empty": "Image alt cannot be empty",
      "string.min": "Image alt must be at least 2 characters long",
      "string.max": "Image alt must be at most 256 characters long",
      "any.required": "Image alt is required",
    }),
  }),

  address: Joi.object({
    state: Joi.string().min(2).max(256).allow("", null).messages({
      "string.base": "State must be a string",
      "string.min": "State must be at least 2 characters long",
      "string.max": "State must be at most 256 characters long",
    }),
    country: Joi.string()
      .valid(...countries)
      .required()
      .messages({
        "any.only": "Country must be a valid country",
        "string.empty": "Country cannot be empty",
        "any.required": "Country is required",
      }),
    city: Joi.string().min(2).max(256).required().messages({
      "string.base": "City must be a string",
      "string.empty": "City cannot be empty",
      "string.min": "City must be at least 2 characters long",
      "string.max": "City must be at most 256 characters long",
      "any.required": "City is required",
    }),
    street: Joi.string().min(2).max(256).required().messages({
      "string.base": "Street must be a string",
      "string.empty": "Street cannot be empty",
      "string.min": "Street must be at least 2 characters long",
      "string.max": "Street must be at most 256 characters long",
      "any.required": "Street is required",
    }),
    houseNumber: Joi.number().min(1).required().messages({
      "number.base": "House number must be a number",
      "number.min": "House number must be at least 1",
      "any.required": "House number is required",
    }),
    zip: Joi.number().min(1).required().messages({
      "number.base": "ZIP must be a number",
      "number.min": "ZIP must be at least 1",
    }),
  }),
});
