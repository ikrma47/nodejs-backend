/* eslint-disable*/
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('examYears', [
      { examination: 'First Year' },
      { examination: 'Second Year' },
      { examination: 'Third Year' },
      { examination: 'Final Year' },
      { examination: 'GAT' },
      { examination: "MS" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('examYears', null);
  }
};
