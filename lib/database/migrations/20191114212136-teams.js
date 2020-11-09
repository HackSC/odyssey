"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Teams", {
        id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(150),
          allowNull: false
        },
        teamCode: {
          type: Sequelize.STRING(4),
          allowNull: false,
          unique: true
        },
        ownerId: {
          type: Sequelize.STRING,
          references: {
            model: "HackerProfiles",
            key: "userId"
          }
        }
      })
      .then(() => {
        return queryInterface.addColumn("HackerProfiles", "teamId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Teams",
            key: "id"
          }
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "teamId"),
      queryInterface.dropTable("Teams")
    ]);
  }
};
