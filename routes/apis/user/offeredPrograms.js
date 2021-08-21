var router = require('express').Router();
var offeredPrograms = require('../../../controllers/api/user/offeredPrograms');

router.use('/', offeredPrograms);

module.exports = router;
