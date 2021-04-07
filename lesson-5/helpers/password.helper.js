const bcrypt = require('bcrypt');

const { WRONG_EMAIL_OR_PASSWORD } = require('../errors/error.messages');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error(WRONG_EMAIL_OR_PASSWORD);
        }
    }
};
