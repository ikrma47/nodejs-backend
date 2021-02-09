var router = require('express').Router();
var { emailOTP } = require('../../../controllers/api/user');

router.use('/', emailOTP);

module.exports = router;
