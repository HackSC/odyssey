"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Tasks", "type", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Tasks", "name", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Tasks", "type"),
      queryInterface.removeColumn("Tasks", "name"),
    ]);
  },
};
