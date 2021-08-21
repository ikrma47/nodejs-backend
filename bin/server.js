var app = require('../index.js');
var { sequelize } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('database is configured');
    await sequelize.sync({ alter: true });
    console.log('database is synced');
    await require('../config/migratations')();
    console.log('migrations successfull');
  } catch (err) {
    console.log('error is ', err.message);
  }
})();

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
