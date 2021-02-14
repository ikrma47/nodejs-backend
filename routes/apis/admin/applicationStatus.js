var router = require('express').Router();
var applicationStatus = require('../../../controllers/api/admin/applicationStatus');

router.use('/', applicationStatus);

module.exports = router;
