var router = require('express').Router();
var passport = require('passport');
var getProfile = require('../../../services/common/getProfile/getProfile');
var updateProfileDetails = require('../../../services/user/profile/updateProfileDetails');
const updateProfilePicture = require('../../../services/user/profile/updateProfilePicture');
const updateCourseCategory = require('../../../services/user/profile/updateCourseCategory');

router.get('/:appId', passport.authenticate('jwt', { session: false }), getProfile);

router.patch('/update-profile-details', passport.authenticate('jwt', { session: false }), updateProfileDetails);

router.patch('/update-profile-picture', passport.authenticate('jwt', { session: false }), updateProfilePicture);

router.patch('/update-course-category', passport.authenticate('jwt', { session: false }), updateCourseCategory);

module.exports = router;
