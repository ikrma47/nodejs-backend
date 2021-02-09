var router = require('express').Router();
var signup = require('../../../services/user/signup/signup.js');

router.post('/', signup);

module.exports = router;
