var router = require('express').Router();
var passport = require('passport');
var dashboard = require('../../../services/admin/dashboard/dashboard');

router.get('/', passport.authenticate('jwt', { session: false }), dashboard);

module.exports = router;
