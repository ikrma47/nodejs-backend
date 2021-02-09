var router = require('express').Router();
var { department } = require('../../../controllers/api/user');

router.use('/', department);

module.exports = router;
