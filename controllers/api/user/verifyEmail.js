var router = require('express').Router();
var verifyEmailByOtp = require('../../../services/user/verifyEmail/verifyEmailByOtp');

router.patch('/otp', verifyEmailByOtp);

module.exports = router;
