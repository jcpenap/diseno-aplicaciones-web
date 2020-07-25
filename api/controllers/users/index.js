const bcrypt = require('bcryptjs'); 
const cryptojs = require("crypto-js");
const config = require('./../../../config');

const User = require('./../../models/users');

const decrypt = (data) => {
    const bytes  = cryptojs.AES.decrypt(data, config.secretKey);
    return bytes.toString(cryptojs.enc.Utf8);
};

const getUsers = (req, res) => {
    res.sendStatus(200);
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.find({_id : id}, ["name", "username", "birthdate"])
    .then((response)=>{
        const user = {
            name: response[0].name,
            username: response[0].username,
            birthdate: decrypt(response[0].birthdate)
        }
        res.status(200).send(user);
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
};
const newUser = (req, res) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);

    const birthdate = cryptojs.AES.encrypt(req.body.birthdate, config.secretKey).toString();    

    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: password,
        email: req.body.email,
        telephone: req.body.telephone,
        birthdate: birthdate
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then((response)=>{
            res.status(201).send(response._id);
        })
        .catch((err)=>{
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(500);
    }
};
const updateUser = (req, res) => {
    res.send("Actualizar usuario");
};
const deleteUser = (req, res) => {
    res.send("Borrar usuario");
};
const loginUser = (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({username: user.username}, ["name", "password"])
    .then(response=>{
        const password = response.password;
        bcrypt.compareSync(user.password, password) ?
            res.status(200).json({name: response.name, id: response._id})
        :
            res.sendStatus(400)    
    })
    .catch(err=>{
        res.sendStatus(400);
    });
};

module.exports = {getUser, newUser, updateUser, deleteUser, loginUser, getUsers};