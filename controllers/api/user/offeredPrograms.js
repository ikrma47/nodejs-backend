var router = require('express').Router();
var passport = require('passport');
var getOfferedPrograms = require('../../../services/common/offeredPrograms/getOfferedPrograms');

router.get('/:batchId', passport.authenticate('jwt', { session: false }), getOfferedPrograms);

module.exports = router;
