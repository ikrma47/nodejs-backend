var router = require('express').Router();
var { resetPassword } = require('../../../controllers/api/user');

router.use('/', resetPassword);

module.exports = router;
