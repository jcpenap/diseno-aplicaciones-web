const getAll = (req, res) =>{
    res.send("Lista de usuarios");
};
const getUser = (req, res) => {
    res.send("Página de usuario");
};
const newUser = (req, res) => {
    res.send("Crear usuario");
};
const updateUser = (req, res) => {
    res.send("Actualizar usuario");
};
const deleteUser = (req, res) => {
    res.send("Borrar usuario");
};

module.exports = {getAll, getUser, newUser, updateUser, deleteUser};