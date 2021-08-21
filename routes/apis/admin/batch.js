var router = require('express').Router();
var { batch } = require('../../../controllers/api/admin');

router.use('/', batch);

module.exports = router;
