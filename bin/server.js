var app = require('../index.js');
var { sequelize } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('database is configured');
    await sequelize.sync({ alter: true });
    console.log('database is synced');
  } catch (err) {
    console.log('error is ', err);
  }
})();

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
