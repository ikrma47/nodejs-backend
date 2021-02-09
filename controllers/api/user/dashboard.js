var router = require('express').Router();
var passport = require('passport');
var dashboard = require('../../../services/user/dashboard/dashboard.js');

router.get('/:appId', passport.authenticate('jwt', { session: false }), dashboard);

module.exports = router;
