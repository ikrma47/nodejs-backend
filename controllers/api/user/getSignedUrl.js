var router = require('express').Router();
const passport = require('passport');
var obtainImageUrl = require('../../../services/user/uploadImage/obtainImageUrl');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  obtainImageUrl,
);

module.exports = router;
