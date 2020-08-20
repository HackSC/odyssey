"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackerProfiles", "travelStatus", {
      type: Sequelize.ENUM,
      values: [
        "ineligible",
        "needed",
        "unneeded",
        "declined",
        "unknown",
        "submitted",
        "reimbursed"
      ]
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackerProfiles", "travelStatus");
  }
};
