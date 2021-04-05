const express = require('express');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const expressHbs = require('express-handlebars');
const { PORT } = require('./configs/config');

const dataUsers = path.join(__dirname, 'data', 'users.json');
const readFile = promisify(fs.readFile);

let users = [];
const readUsers = async () => {
    try {
        const usersFromData = await readFile(dataUsers);
        users = JSON.parse(usersFromData.toString());
    } catch (e) {
        console.log(e.message);
    }
};
readUsers();

const app = express();

app.use(express.json()); // для роботи з json і не тільки
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs'); // який двигун для відображення використовувати
app.engine('.hbs', expressHbs({
    defaultLayout: false // як працювати коли зустрінеться хбс
}));

app.set('views', path.join(__dirname, 'static')); // де лежать вюшки

// AllUsers------------------------------------
app.get('/users', ((req, res) => {
    res.render('users', { users });// перший параметр з якої папкирендерим
}));
// AllUsers----------------------------------------

// User-------------------------------------------
app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    res.render('user', { user: users[userId] });
});
// User-------------------------------------------

// Registration----------------------------------

app.get('/registration', (req, res) => {
    res.render('registration', { users });
});

app.post('/registration', (req, res) => {
    if (users.find((user) => user.email === req.body.email)) {
        res.redirect('/error');
        return;
    }
    users.push(req.body);
    fs.writeFile(dataUsers, JSON.stringify(users), (err) => {
        if (err) {
            res.redirect('/error');
            return;
        }
        res.redirect('/users');
    });
});
// Registration---------------------------------

// Login---------------------------------------
app.get('/login', (req, res) => {
    res.render('login', { users });
});

app.post('/login', (req, res) => {
    if (users.find((user) => user.email === req.body.email && user.password === req.body.password)) {
        const userId = users.findIndex((index) => index.email === req.body.email);
        res.redirect(`/users/${userId}`);
        return;
    }
    res.redirect('/registration');
});
// Login-----------------------------------------

// Error---------------------------------------
app.get('/error', (req, res) => {
    res.render('error');
});
// Error---------------------

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

// npm i express-handlebars
