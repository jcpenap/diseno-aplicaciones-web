//importar express
const express = require('express');
//instanciar express en el objeto app
const app = express();
//importar módulo personalizado
const date = require('./date');

app.get('/', (req, res) =>{
    res.status(200).send(`Hola mundo ${date()}`);
});
app.get('/users', (req, res)=>{
    res.status(200).send("Página de usuarios");
});
app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    if(id>0){
        res.status(200).send(`Página del usuario ${id}`);
    }else{
        res.sendStatus(400);
    }
});

app.listen(3000, () => {
 console.log("Servidor iniciado");
});