"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Tasks", "sponsor", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Tasks", "isPast", {
        type: Sequelize.BOOLEAN,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Tasks", "sponsor"),
      queryInterface.removeColumn("Tasks", "isPast")
    ]);
  }
};
