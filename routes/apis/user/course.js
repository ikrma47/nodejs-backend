var router = require('express').Router();
var { course } = require('../../../controllers/api/user');

router.use('/', course);

module.exports = router;
