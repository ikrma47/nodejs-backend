/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkInsert("academicTerms", [
      { termName: "fall", createdAt: new Date(), updatedAt: new Date() },
      { termName: "winter", createdAt: new Date(), updatedAt: new Date() },
      { termName: "spring", createdAt: new Date(), updatedAt: new Date() },
      { termName: "summer", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete("academicTerms", null)
  }
};
