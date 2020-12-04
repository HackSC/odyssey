"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("ProjectTeamPrizes", "createdAt", {
        type: Sequelize.DATE,
        allowNull: false
      }),
      queryInterface.addColumn("ProjectTeamPrizes", "updatedAt", {
        type: Sequelize.DATE,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("ProjectTeamPrizes", "createdAt"),
      queryInterface.removeColumn("ProjectTeamPrizes", "updatedAt")
    ]);
  }
};
