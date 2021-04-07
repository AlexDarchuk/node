const { Schema, model } = require('mongoose');
const { dataBaseTAblesEnum: { USER } } = require('../../constants');

// const carSubcheme = {
//     model: { type: String },
//     price: { type: Number }
// };

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 15 },
    email: { type: String, required: true },
    password: { type: String, required: true, maxlength: 100 },
    // cars: [carSubcheme]
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.age}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

userScheme.pre('find', function() {
    this.populate('userCars');
})
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
// 1-назва моделькі 2-де описується
