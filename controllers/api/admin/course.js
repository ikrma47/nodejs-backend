var router = require('express').Router();
var passport = require('passport');
var addCourse = require('../../../services/admin/course/addCourse');
var getCourse = require('../../../services/admin/course/getCourse');

router.get('/', passport.authenticate('jwt', { session: false }), getCourse);
router.post('/', passport.authenticate('jwt', { session: false }), addCourse);

module.exports = router;
