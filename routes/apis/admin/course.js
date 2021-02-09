var router = require('express').Router();
var { course } = require('../../../controllers/api/admin');

router.use('/', course);

module.exports = router;
