const { Schema, model } = require('mongoose');
const { dataBaseTAblesEnum: { CAR } } = require('../../constants');

const carScheme = new Schema({
    model: { type: String },
    price: { type: Number }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(CAR, carScheme);
