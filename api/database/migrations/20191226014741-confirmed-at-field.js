"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "confirmedAt", {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("HackerProfiles", "declinedAt", {
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "confirmedAt"),
      queryInterface.removeColumn("HackerProfiles", "declinedAt"),
    ]);
  },
};
