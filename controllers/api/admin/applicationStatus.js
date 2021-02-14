var router = require('express').Router();
var passport = require('passport');
var updateApplicationStatus = require('../../../services/admin/applicationStatus/updateApplicationStatus');

router.patch('/:appId', passport.authenticate('jwt', { session: false }), updateApplicationStatus);

module.exports = router;
