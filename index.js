
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const config = require('./config');
const app = express();
const api = require('./api');

app.use(express.json());
app.use('/api', api);

config.env === "development" &&
    mongoose.connect(`mongodb://${config.database.development.host}/${config.database.development.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, ()=>{
        console.log("Conectado a la base de datos");
    });
config.env === "production" &&
    mongoose.connect(`mongodb+srv://${config.database.production.user}:${config.database.production.password}@${config.database.production.host}/${config.database.development.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, ()=>{
        console.log("Conectado a la base de datos");
    });

const server = app.listen(config.server.port,config.server.host,  () => {
    console.log(`Servidor iniciado en el puerto ${server.address().port} en modo ${config.env}`);
});
