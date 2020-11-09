"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Teams", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false
      }),
      queryInterface.addColumn("Teams", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Teams", "createdAt"),
      queryInterface.removeColumn("Teams", "updatedAt")
    ]);
  }
};
