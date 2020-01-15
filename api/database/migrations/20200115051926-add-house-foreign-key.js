"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("persons", "house", {
      type: Sequelize.INTEGER,
      references: {
        model: "Houses",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("persons", "house");
  }
};
