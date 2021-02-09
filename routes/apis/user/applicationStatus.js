var router = require('express').Router();
var { applicationStatus } = require('../../../controllers/api/user');

router.use('/', applicationStatus);

module.exports = router;
