'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "instagram", {
        type: Sequelize.STRING(500),
        defaultValue: false,
      }),
      queryInterface.addColumn("HackerProfiles", "bio", {
        type: Sequelize.STRING(1000),
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "instagram"),
      queryInterface.removeColumn("HackerProfiles", "bio"),
    ]);
  }
};
