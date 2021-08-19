var router = require('express').Router();
var offeredPrograms = require('../../../controllers/api/admin/offeredPrograms');

router.use('/', offeredPrograms);

module.exports = offeredPrograms;
