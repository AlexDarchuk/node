const path = require('path');
const { promisify } = require('util');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

module.exports = {
    findUsers: async () => {
        const users = await readFile(dbPath);

        return JSON.parse(users.toString());
    },

    findUserById: async (userId) => {
        const users = await readFile(dbPath);
        const usersById = JSON.parse(users.toString());

        return usersById[userId];
    },

    createUser: async (userObject) => {
        const users = await readFile(dbPath);
        const createUser = JSON.parse(users.toString());

        createUser.push(userObject);

        await writeFile(dbPath, JSON.stringify(createUser));
    },

    deleteUser: async (userId) => {
        const users = await readFile(dbPath);
        const deleteUser = JSON.parse(users.toString());

        deleteUser.splice(userId, 1);

        await writeFile(dbPath, JSON.stringify(deleteUser));
    }
};
