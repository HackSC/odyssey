"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return;
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "PendingTeammateRequests",
      "hackerProfileId"
    );
  },
};

("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "userId", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.addColumn(
        "PendingTeammateRequests",
        "hackerProfileId",
        {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING,
          references: {
            model: "HackerProfiles",
            key: "userId",
          },
        },
        {
          charset: "ascii",
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "userId", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      }),
      queryInterface.removeColumn("PendingTeammateRequests", "hackerProfileId"),
    ]);
  },
};
