/* eslint-disable*/
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("phoneNumbers", "personalNumber", { type: Sequelize.STRING })
    await queryInterface.changeColumn("phoneNumbers", "optionalNumber", { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("phoneNumbers", "personalNumber", { type: Sequelize.BIGINT })
    await queryInterface.changeColumn("phoneNumbers", "optionalNumber", { type: Sequelize.BIGINT })
  }
};
