var router = require('express').Router();
var passport = require('passport');
var getDocuments = require('../../../services/common/documents/getDocuments');
var submitDocuments = require('../../../services/user/documents/submitDocument');

router.get('/:appId', passport.authenticate('jwt', { session: false }), getDocuments);
router.patch('/', passport.authenticate('jwt', { session: false }), submitDocuments);

module.exports = router;
