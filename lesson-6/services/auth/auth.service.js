const { passwordHasher, tokenizer } = require('../../helpers');
const { O_Auth } = require('../../dataBase');

module.exports = {
    createTokens: async (password, user) => {
        await passwordHasher.compare(password, user.password);

        const tokens = tokenizer();

        await O_Auth.create({ ...tokens, user: user._id });

        return tokens;
    },
    removeTokens: async (oldTokens) => {
        await O_Auth.findByIdAndRemove(oldTokens._id);

        const tokens = tokenizer();

        await O_Auth.create({ ...tokens, user: oldTokens._user_id });

        return tokens;
    }
};
