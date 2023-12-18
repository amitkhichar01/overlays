const Joi = require("joi");

module.exports.userSchemaJoi = Joi.object({
    user: Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).required(),
});
