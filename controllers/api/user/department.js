var router = require('express').Router();
var passport = require('passport');
var getDepartment = require('../../../services/common/getDepartment/getDepartment');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getDepartment,
);

module.exports = router;
