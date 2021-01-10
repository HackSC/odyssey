'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("HackathonConstants", "type", {
      type: Sequelize.ENUM,
      values: ["date", "boolean", "string"],
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackathonConstants", "type");
  }
};
