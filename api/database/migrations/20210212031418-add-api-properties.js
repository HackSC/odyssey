"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Apis", "image_url", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Apis", "slack_channel", {
        type: Sequelize.STRING
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Apis", "image_url"),
      queryInterface.removeColumn("Apis", "slack_channel"),
    ]);
  }
};
