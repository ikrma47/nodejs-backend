var router = require('express').Router();
var { preferences } = require('../../../controllers/api/user');

router.use('/', preferences);

module.exports = router;
