var router = require('express').Router();
var passport = require('passport');
var getExperience = require('../../../services/common/experience/getExperience');
var submitExperience = require('../../../services/user/experience/submitExperience');
var deleteExperience = require('../../../services/user/experience/deleteExperience');

router.post('/', passport.authenticate('jwt', { session: false }), submitExperience);

router.get('/:appId', passport.authenticate('jwt', { session: false }), getExperience);

router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteExperience);

module.exports = router;
