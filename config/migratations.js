const { exec } = require('child_process');

async function start() {
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      // { env: 'development' },
      // eslint-disable-next-line no-unused-vars
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );

    // Forward stdout+stderr to this process
    migrate.stdout.on('data', (data) => {
      if (data.indexOf('No migrations were executed, database schema was already up to date.') !== -1) {
        migrate.kill();
      }
    });
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
}

module.exports = start;
