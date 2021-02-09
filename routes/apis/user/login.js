var router = require('express').Router();
var { login } = require('../../../controllers/api/user');

router.use('/', login);

module.exports = router;
