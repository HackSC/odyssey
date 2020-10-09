"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProjectTeamPrizes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectTeam: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProjectTeams",
          key: "id",
        },
      },
      prize: {
        type: Sequelize.INTEGER,
        references: {
          model: "Prizes",
          key: "id",
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ProjectTeamPrizes");
  },
};
