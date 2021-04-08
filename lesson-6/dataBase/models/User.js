const { Schema, model } = require('mongoose');
const { dataBaseTAblesEnum: { USER } } = require('../../constants');

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 15 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

// eslint-disable-next-line func-names
userScheme.virtual('full_name').get(function() {
    return `${this.name} ${this.age}`;
});

userScheme.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id'
});

// eslint-disable-next-line func-names
userScheme.pre('find', function() {
    this.populate('userCars');
})
    // eslint-disable-next-line func-names
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model(USER, userScheme);
// 1-назва моделькі 2-де описується
