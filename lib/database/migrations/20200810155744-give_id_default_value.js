"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "id", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "hacker_id"
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "id", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      })
    ]);
  }
};
