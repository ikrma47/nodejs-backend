var router = require('express').Router();
var passport = require('passport');
var getApplications = require('../../../services/admin/applications/getApplications');
// var getApplicationsByDepartmentAndCourseCategory
// = require('../../../services/admin/applications/getApplicationsByDepartmentAndCourseCategory');
// var getApplicationsByDepartment
// = require('../../../services/admin/applications/getApplicationsByDepartment');

// router.get(
// '/:departmentName',
// passport.authenticate('jwt', { session: false }),
// getApplicationsByDepartment
// );
// router.get('/:departmentName/:courseCategory',
// passport.authenticate('jwt', { session: false }), getApplicationsByDepartmentAndCourseCategory);
router.get('/all', passport.authenticate('jwt', { session: false }), getApplications);

module.exports = router;
