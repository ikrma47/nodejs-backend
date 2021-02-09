var router = require('express').Router();
var emailOTP = require('../../../services/common/emailOtp/emailOTP');

router.patch('/', emailOTP);

module.exports = router;
