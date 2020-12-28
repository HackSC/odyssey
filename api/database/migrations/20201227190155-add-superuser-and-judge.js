"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "role", {
      type: Sequelize.ENUM,
      values: [
        "hacker",
        "admin",
        "sponsor",
        "superadmin",
        "volunteer",
        "judge",
      ],
      defaultValue: "hacker",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "role", {
      type: Sequelize.ENUM,
      values: ["hacker", "admin", "sponsor", "volunteer"],
    });
  },
};
