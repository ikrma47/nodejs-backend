var { Router } = require('express');

var router = new Router();

router.use('/academics', require('./academics'));
router.use('/dashboard', require('./dashboard'));
router.use('/experience', require('./experience'));
router.use('/login', require('./login'));
router.use('/profile', require('./profile'));
router.use('/signup', require('./signup'));
router.use('/course', require('./course'));
router.use('/department', require('./department'));
router.use('/preference', require('./preference'));
router.use('/email-otp', require('./emailOtp'));
router.use('/verify-email', require('./verifyEmailByOtp'));
router.use('/forget-password', require('./resetPassword'));
router.use('/get-signed-url', require('./getSignedUrl'));
router.use('/application-status', require('./applicationStatus'));
router.use('/document', require('./documents'));

module.exports = router;
