'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "role", {
      type: Sequelize.ENUM,
      values: ["hacker", "admin", "sponsor", "volunteer"],
      defaultValue: "hacker"
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "role", {
      type: Sequelize.ENUM,
      values: ["hacker", "admin", "sponsor", "superadmin"],
      defaultValue: "hacker"
    })
  }
};
