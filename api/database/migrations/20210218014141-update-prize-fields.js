"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Prizes", "sponsor", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Prizes", "image_url", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Prizes", "info_url", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Prizes", "sponsor_url", {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Prizes", "sponsor");
    await queryInterface.removeColumn("Prizes", "image_url");
    await queryInterface.removeColumn("Prizes", "info_url");
    await queryInterface.removeColumn("Prizes", "sponsor_url");
  },
};
