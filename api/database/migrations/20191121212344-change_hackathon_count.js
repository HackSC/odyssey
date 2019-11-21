"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "hackathonCount", {
      type: Sequelize.ENUM,
      values: ["0", "1", "2", "3", "4", "5+"],
      defaultValue: "0",
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("HackerProfiles", "hackathonCount", {
      type: Sequelize.STRING
    });
  }
};
