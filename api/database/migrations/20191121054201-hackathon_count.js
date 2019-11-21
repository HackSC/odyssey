"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackerProfiles", "hackathonCount", {
      type: Sequelize.STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackerProfiles", "hackathonCount");
  }
};
