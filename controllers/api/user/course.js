var router = require('express').Router();
var passport = require('passport');
var getCourse = require('../../../services/user/course/getCourse');

router.get('/', passport.authenticate('jwt', { session: false }), getCourse);

module.exports = router;
