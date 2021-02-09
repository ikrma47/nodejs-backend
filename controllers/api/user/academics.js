var router = require('express').Router();
var passport = require('passport');
var getAcademics = require('../../../services/common/academics/getAcademics');
var updateAcademics = require('../../../services/user/academics/updateAcademics');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  updateAcademics,
);
router.get('/:appId', passport.authenticate('jwt', { session: false }), getAcademics);

module.exports = router;
