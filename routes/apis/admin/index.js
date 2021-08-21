var router = require('express').Router();

router.use('/department', require('./department'));
router.use('/course', require('./course'));
router.use('/dashboard', require('./dashboard'));
router.use('/applications', require('./applications'));
router.use('/application-status', require('./applicationStatus'));
router.use('/batch', require('./batch'));
router.use('/offered-programs', require('./offeredPrograms'));
router.use('/semester', require('./semester'));

module.exports = router;
