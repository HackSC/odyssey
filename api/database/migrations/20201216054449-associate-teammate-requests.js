'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PendingTeammateRequests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Teams",
          key: "id",
        }
      },
      hackerProfileId: {
        type: Sequelize.STRING,
        references: {
          model: "HackerProfiles",
          key: "userId",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PendingTeammateRequests');
  }
};
