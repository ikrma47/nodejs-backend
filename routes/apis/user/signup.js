var router = require('express').Router();
var { signup } = require('../../../controllers/api/user');

router.use('/', signup);

module.exports = router;
