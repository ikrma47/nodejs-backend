var router = require('express').Router();
var { verifyEmail } = require('../../../controllers/api/user');

router.use('/', verifyEmail);

module.exports = router;
