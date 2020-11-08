"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Groupings", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface.addColumn("Tasks", "groupingId", {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: "Groupings",
            key: "id",
          },
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Tasks", "groupingId").then(() => {
      return queryInterface.dropTable("Groupings");
    });
  },
};
