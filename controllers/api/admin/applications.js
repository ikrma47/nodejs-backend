var router = require('express').Router();
var passport = require('passport');
var getApplicationsByDepartmentAndCourseCategory = require('../../../services/admin/applications/getApplicationsByDepartmentAndCourseCategory');
var getApplicationsByDepartment = require('../../../services/admin/applications/getApplicationsByDepartment');

router.get('/:departmentName', passport.authenticate('jwt', { session: false }), getApplicationsByDepartment);
router.get('/:departmentName/:courseCategory', passport.authenticate('jwt', { session: false }), getApplicationsByDepartmentAndCourseCategory);

module.exports = router;
