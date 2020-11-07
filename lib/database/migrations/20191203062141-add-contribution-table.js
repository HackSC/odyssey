"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Contributions", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      personId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "persons",
          key: "identityId",
        },
      },
      taskId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Tasks",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Contributions");
  },
};
