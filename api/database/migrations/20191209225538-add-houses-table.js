"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Houses", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addColumn("persons", "houseId", {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Houses",
            key: "id"
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("persons", "houseId").then(() => {
      return queryInterface.dropTable("Houses");
    });
  }
};
