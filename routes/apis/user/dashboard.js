var router = require('express').Router();
var { dashboard } = require('../../../controllers/api/user');

router.use('/', dashboard);

module.exports = router;
