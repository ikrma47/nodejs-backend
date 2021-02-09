var router = require('express').Router();
var home = require('../controllers/home');

router.use('/', home);

module.exports = home;
