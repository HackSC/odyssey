"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Judgings", "id", {
      allowNull: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Judgings", "id", {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },
};
