var router = require('express').Router();
var documents = require('../../../controllers/api/user/documents');

router.use('/', documents);

module.exports = router;
