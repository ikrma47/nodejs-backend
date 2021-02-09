var router = require('express').Router();
const passport = require('passport');
var getPreferences = require('../../../services/common/getPreferences/getPreference');
var submitPreferences = require('../../../services/user/preferences/submitPreference');
var deletePreferences = require('../../../services/user/preferences/deletePreference');

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  submitPreferences,
);

router.get(
  '/:appId',
  passport.authenticate('jwt', { session: false }),
  getPreferences,
);

router.delete(
  '/:preference',
  passport.authenticate('jwt', { session: false }),
  deletePreferences,
);

module.exports = router;
