const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const User = require('./../../models/users');
const crypto = require('./../../functions/crypto');
const config = require('./../../../config');

const getUsers = (req, res) => {
    res.sendStatus(200);
};
const getUser = (req, res) => {
    const id = req.params.id;
    User.findOne({_id : id}, ["name", "username", "birthdate"])
    .then((response)=>{
        const user = {
            name: response.name,
            username: response.username,
            birthdate: crypto.decrypt(response.birthdate)
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

    const birthdate = crypto.encrypt(req.body.birthdate);    

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
    User.findOne({username: user.username}, ["username", "name", "password"])
    .then(response=>{
        const password = response.password;
        if(bcrypt.compareSync(user.password, password)){            
            const token = jwt.sign({id: response._id}, config.tokenKey);
            res.status(200).json({token: token, username: response.username, name: response.name, id: response._id});            
        }else
            res.sendStatus(400)    
    })
    .catch(err=>{
        res.sendStatus(400);
    });
};

module.exports = {getUser, newUser, updateUser, deleteUser, loginUser, getUsers};