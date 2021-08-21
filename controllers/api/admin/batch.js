var router = require('express').Router();
var passport = require('passport');
var addBatch = require('../../../services/admin/batch/addBatch');
var getBatches = require('../../../services/admin/batch/getBatches');

router.post('/', passport.authenticate('jwt', { session: false }), addBatch);
router.get('/', passport.authenticate('jwt', { session: false }), getBatches);

module.exports = router;
