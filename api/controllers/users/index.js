const User = require('./../../models/users');

const getAll = (req, res) =>{
    User.find({})
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch((err)=>{
        res.sendStatus(500);
    })
};
const getUser = (req, res) => {
    res.send("Página de usuario");
};
const newUser = (req, res) => {
    const user = {
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        telephone: req.body.telephone
    };
    if(user.name && user.age && user.username && user.password && user.email){
        const object = new User(user);
        object.save()
        .then(()=>{
            res.status(201).send("El usuario fue creado");
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

module.exports = {getAll, getUser, newUser, updateUser, deleteUser};