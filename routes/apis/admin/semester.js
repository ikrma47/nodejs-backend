var router = require('express').Router();
var semester = require('../../../controllers/api/admin/semester');

router.use('/', semester);

module.exports = router;
