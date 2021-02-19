'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Teams", "lookingForTeammates", {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn("Teams", "description", {
        type: Sequelize.TEXT,
        defaultValue: false
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Teams", "lookingForTeammates"),
      queryInterface.removeColumn("Teams", "description"),
    ]);
  }
};
