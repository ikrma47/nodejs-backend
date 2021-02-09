var router = require('express').Router();

router.use('/department', require('./department'));
router.use('/course', require('./course'));
router.use('/dashboard', require('./dashboard'));
router.use('/applications', require('./applications'));

module.exports = router;
