var router = require('express').Router();
var passport = require('passport');
var getDepartment = require('../../../services/common/department/getDepartment');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getDepartment,
);

module.exports = router;
