"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackerProfiles", "qrCodeId", {
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackerProfiles", "qrCodeId");
  }
};
