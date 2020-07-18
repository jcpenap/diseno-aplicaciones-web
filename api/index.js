const express = require ('express');
const router = express.Router();
const logger = require('./middlewares/logger');
const users = require('./routers/users');

router.use(logger);
router.use('/users', users);

module.exports = router;