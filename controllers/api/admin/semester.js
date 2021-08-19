var router = require('express').Router();
var passport = require('passport');
var getDetailedBatches = require('../../../services/admin/semester/getDetailedBatches');
var getSemesters = require('../../../services/admin/semester/getSemesters');
var addSemester = require('../../../services/admin/semester/addSemester');
var getSemester = require('../../../services/admin/semester/getSemester');

router.get('/batches', passport.authenticate('jwt', { session: false }), getDetailedBatches);
router.post('/', passport.authenticate('jwt', { session: false }), addSemester);
router.get('/', passport.authenticate('jwt', { session: false }), getSemesters);
router.get('/:semesterId', passport.authenticate('jwt', { session: false }), getSemester);

module.exports = router;
