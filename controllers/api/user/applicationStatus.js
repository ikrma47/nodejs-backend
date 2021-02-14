var router = require('express').Router();
var passport = require('passport');
var getApplicationStatus = require('../../../services/common/applicationStatus/getApplicationStatus');
var updateApplicationStatus = require('../../../services/user/applicationStatus/updateApplicationStatus');

router.get('/:appId', passport.authenticate('jwt', { session: false }), getApplicationStatus);

router.patch('/', passport.authenticate('jwt', { session: false }), updateApplicationStatus);

module.exports = router;
