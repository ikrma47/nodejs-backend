var router = require('express').Router();
var passport = require('passport');
var getProgramsToBeOffered = require('../../../services/admin/offeredPrograms/getProgramsToBeOffered');
var addToOfferedPrograms = require('../../../services/admin/offeredPrograms/addToOfferedPrograms');

router.get('/:batchId', passport.authenticate('jwt', { session: false }), getProgramsToBeOffered);
router.post('/:batchId', passport.authenticate('jwt', { session: false }), addToOfferedPrograms);

module.exports = router;
