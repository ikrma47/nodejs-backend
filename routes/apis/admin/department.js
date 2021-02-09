var router = require('express').Router();
var { department } = require('../../../controllers/api/admin');

router.use('/', department);

module.exports = router;
