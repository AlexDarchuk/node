const express = require('express');

const apiRouter = require('./routers/api.router');
const { PORT } = require('./configs/config');

const app = express();

app.use(express.json());  // для роботи з json і не тільки
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

//npm i express-handlebars