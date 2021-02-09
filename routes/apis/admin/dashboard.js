var router = require('express').Router();
var { dashboard } = require('../../../controllers/api/admin');

router.use('/', dashboard);

module.exports = router;
