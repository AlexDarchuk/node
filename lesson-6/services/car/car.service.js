const Car = require('../../dataBase/models/Car');

module.exports = {
    findCars: () => Car.find(),

    findCarById: (carId) => Car.findById(carId),

    createCar: (carObject) => Car.create(carObject),

    deleteCar: (carId) => Car.findByIdAndDelete(carId)
};
