var { Router } = require('express');

var router = new Router();

router.use('/user', require('./user'));
router.use('/admin', require('./admin'));

module.exports = router;
