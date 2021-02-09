var router = require('express').Router();
var { getSignedUrl } = require('../../../controllers/api/user');

router.use('/', getSignedUrl);

module.exports = router;
