const User = require('../../dataBase/models/User');
require('../../dataBase/models/Car');

module.exports = {
    findUsers: () => User.find(),

    findUserById: (userId) => User.findById(userId),

    findUserByEmail: (userEmail) => User.find({ email: userEmail }),

    createUser: (userObject) => User.create(userObject),

    deleteUser: (userId) => User.findByIdAndDelete(userId)
};
