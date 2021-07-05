"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("refresh_tokens", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("refresh_tokens", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
