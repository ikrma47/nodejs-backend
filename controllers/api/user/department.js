var router = require('express').Router();
var passport = require('passport');
var getDepartment = require('../../../services/common/department/getDepartment');
var getDepartmentByBatch = require('../../../services/common/department/getDepartmentByBatch');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getDepartment,
);

router.get(
  '/:batchId',
  passport.authenticate('jwt', { session: false }),
  getDepartmentByBatch,
);

module.exports = router;
