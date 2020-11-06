"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Contributions", "scannerId", {
      type: Sequelize.STRING,
      references: {
        model: "HackerProfiles",
        key: "userId",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Contributions", "scannerId");
  },
};
