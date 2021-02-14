var router = require('express').Router();

router.use('/department', require('./department'));
router.use('/course', require('./course'));
router.use('/dashboard', require('./dashboard'));
router.use('/applications', require('./applications'));
router.use('/application-status', require('./applicationStatus'));

module.exports = router;
