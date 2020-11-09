"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "codeOfConduct", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("HackerProfiles", "authorize", {
        type: Sequelize.BOOLEAN
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "codeOfConduct"),
      queryInterface.removeColumn("HackerProfiles", "authorize")
    ]);
  }
};
