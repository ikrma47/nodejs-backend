var router = require('express').Router();
var { academics } = require('../../../controllers/api/user');

router.use('/', academics);

module.exports = router;
