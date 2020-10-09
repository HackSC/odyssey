"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackerProfiles", "noBusCheck", {
      type: Sequelize.BOOLEAN,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackerProfiles", "noBusCheck", {
      type: Sequelize.BOOLEAN,
    });
  },
};
