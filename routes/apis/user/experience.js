var router = require('express').Router();
var { experience } = require('../../../controllers/api/user');

router.use('/', experience);

module.exports = router;
