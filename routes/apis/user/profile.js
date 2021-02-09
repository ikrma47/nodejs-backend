var router = require('express').Router();
var { profile } = require('../../../controllers/api/user');

router.use('/', profile);

module.exports = router;
