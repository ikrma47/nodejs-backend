var router = require('express').Router();
var login = require('../../../services/common/login/login.js');

router.post('/', login);

module.exports = router;
