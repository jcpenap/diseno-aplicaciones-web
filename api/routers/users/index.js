const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');
const logger = require('./../../middlewares/logger');

router.route('/')
    .get(controller.getUsers)
    .post(logger, controller.newUser)
    .delete(logger,controller.deleteUser);

router.route('/login')
        .post(logger, controller.loginUser);

router.route('/:id')
    .get(controller.getUser)
    .put(logger, controller.updateUser);

module.exports = router;