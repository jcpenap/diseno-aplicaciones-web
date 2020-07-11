//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();
//importar módulo personalizado
const date = require('./date');
const bmi = require('./bmi');
//modelos
const users = [];
//middlewares

const logger = (req, res, next) => {
    console.log(`${date()} :: ${req.method} :: ${req.path}`);
    next();
}

app.use(logger);
app.use(express.json());

app.get('/', (req, res) =>{
    res.status(200).send(`Hola mundo ${date()}`);
});
app.get('/users', (req, res)=>{
    res.status(200).send(users);
});
app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    if(id>0){
        res.status(200).send(`Página del usuario ${id}`);
    }else{
        res.sendStatus(400);
    }
});

app.get('/bmi/:weight/:height', (req, res)=>{
    const weight = req.params.weight;
    const height = req.params.height;
    const bmiResult = bmi(weight, height);
    bmiResult === -1 ?
        res.sendStatus(500)
    :    
        res.status(200).send(`bmi: ${bmiResult}`);
});

/*
{
    "name": "Jesus",
    "lastname": "Estrada"
}
*/
app.post('/users', (req, res)=>{
    const user = {
        name: req.body.name,
        lastname: req.body.lastname
    };
    users.push(user);
    res.status(200).send(`El usuario ${user.name} fue creado`);    
});

app.listen(3000, () => {
 console.log("Servidor iniciado");
});