var router = require('express').Router();

router.use('/home', require('./home'));
router.use('/api', require('./apis'));

module.exports = router;
