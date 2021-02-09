var router = require('express').Router();
var passport = require('passport');
var addDepartment = require('../../../services/admin/department/addDepartment');
var getDepartment = require('../../../services/common/getDepartment/getDepartment');

router.get('/', passport.authenticate('jwt', { session: false }), getDepartment);
router.post('/', passport.authenticate('jwt', { session: false }), addDepartment);

module.exports = router;
