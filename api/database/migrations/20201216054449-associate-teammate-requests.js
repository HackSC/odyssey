'use strict';
// PendingTeammateRequests: Team Invites Someone to the Team
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
      owner: {
        type: Sequelize.ENUM,
        values: ["team", "hacker"],
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
