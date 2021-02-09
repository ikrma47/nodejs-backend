var { Sequelize } = require('sequelize');

module.exports = new Sequelize('pgs_admission', 'node_user', '12345', {
  host: 'localhost',
  dialect: 'postgres',
});
