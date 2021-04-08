const Joi = require('joi');

module.exports = Joi.object({
    model: Joi.string().required(),
    price: Joi.number().required()
});
