"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("persons", "projectTeamId", {
      type: Sequelize.INTEGER,
      references: {
        model: "ProjectTeams",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("persons", "projectTeamId");
  }
};
