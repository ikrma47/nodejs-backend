var router = require('express').Router();
var { application } = require('../../../controllers/api/admin');

router.use('/', application);

module.exports = router;
