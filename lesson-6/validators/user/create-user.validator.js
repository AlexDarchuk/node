const Joi = require('joi');
const { regexEnum } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(50),
    age: Joi.number().integer().min(1).max(110),
    email: Joi.string().regex(regexEnum.EMAIL_REGEXP).required(),
    password: Joi.string().regex(regexEnum.PASSWORD_REGEXP).required(),
    car: Joi.array().items()
});
