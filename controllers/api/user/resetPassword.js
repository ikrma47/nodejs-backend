var router = require('express').Router();
var verifyOTP = require('../../../services/common/resetPassword/verifyOTP');
var resetPassword = require('../../../services/common/resetPassword/resetPassword');

router.post('/verify-otp', verifyOTP);
router.patch('/reset-password', resetPassword);

module.exports = router;
