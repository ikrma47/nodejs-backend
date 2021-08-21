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
    await queryInterface.bulkInsert("semesters", [
      {semester: "1st",createdAt: new Date(), updatedAt: new Date()},
      {semester: "2nd",createdAt: new Date(), updatedAt: new Date()},
      {semester: "3rd",createdAt: new Date(), updatedAt: new Date()},
      {semester: "4th",createdAt: new Date(), updatedAt: new Date()},
      {semester: "5th",createdAt: new Date(), updatedAt: new Date()},
      {semester: "6th",createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.bulkDelete("semesters",null)
  }
};
