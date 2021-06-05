/* eslint-disable */
'use strict';
var { passwordHash } = require("../lib/utils")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert(
      'users',
      [
        {
          cnic: '9876543211234',
          email: 'test@admin.com',
          password: passwordHash('12345'),
          isAdmin: true,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete('users', { cnic: '9876543211234' })
  }
};
