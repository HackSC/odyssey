"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackerProfiles", "role", {
      type: Sequelize.ENUM,
      values: ["hacker", "admin", "sponsor", "superadmin"]
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn("HackerProfiles", "role");
  }
};
