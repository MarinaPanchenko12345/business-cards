import Joi from "joi";

export const LoginSchema = Joi.object({
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
  password: Joi.string()
    .min(9)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*-]).{9,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 9 characters long",
      "any.required": "Password is required",
    }),
});

export const SignupSchema = Joi.object({
  name: Joi.object({
    first: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(2)
      .max(256)
      .required()
      .messages({
        "string.base": "First name must be a string",
        "string.empty": "First name cannot be empty",
        "string.min": "First name must be at least 2 characters long",
        "string.max": "First name must be at most 256 characters long",
        "string.pattern.base": "First name can only contain letters",
        "any.required": "First name is required",
      }),
    middle: Joi.string()
      .pattern(/^[A-Za-z]*$/)
      .min(2)
      .max(256)
      .allow("", null)
      .messages({
        "string.base": "Middle name must be a string",
        "string.min": "Middle name must be at least 2 characters long",
        "string.max": "Middle name must be at most 256 characters long",
        "string.pattern.base": "Middle name can only contain letters",
      }),
    last: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(2)
      .max(256)
      .required()
      .messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name must be at least 2 characters long",
        "string.max": "Last name must be at most 256 characters long",
        "string.pattern.base": "Last name can only contain letters",
        "any.required": "Last name is required",
      }),
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
  password: Joi.string()
    .min(9)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*-]).{9,}$")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 9 characters long",
      "any.required": "Password is required",
    }),
  image: Joi.object({
    url: Joi.string().uri().min(14).max(256).allow("", null).messages({
      "string.uri": "Image URL must be a standard URL",
      "string.min": "Image URL must be at least 14 characters long",
      "string.max": "Image URL must be at most 256 characters long",
    }),
    alt: Joi.string().min(2).max(256).allow("", null).messages({
      "string.base": "Image alt must be a string",
      "string.min": "Image alt must be at least 2 characters long",
      "string.max": "Image alt must be at most 256 characters long",
    }),
  }),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow("", null).messages({
      "string.base": "State must be a string",
      "string.min": "State must be at least 2 characters long",
      "string.max": "State must be at most 256 characters long",
    }),
    country: Joi.string().min(2).max(256).required().messages({
      "string.base": "Country must be a string",
      "string.empty": "Country cannot be empty",
      "string.min": "Country must be at least 2 characters long",
      "string.max": "Country must be at most 256 characters long",
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
      "string.empty": "House cannot be empty",
      "number.min": "House number must be at least 1",
      "any.required": "House number is required",
    }),
    zip: Joi.number().min(1).allow("", null).messages({
      "number.base": "ZIP must be a number",
      "number.min": "ZIP must be at least 1",
    }),
  }),
  isBusiness: Joi.boolean().required().messages({
    "any.required": "isBusiness is required",
  }),
});
