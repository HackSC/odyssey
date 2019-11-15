"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("HackerReviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hackerId: {
        type: Sequelize.STRING,
        references: {
          model: "HackerProfiles",
          key: "userId"
        }
      },
      createdBy: {
        // Should reference admin who created this review
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "HackerProfiles",
          key: "userId"
        }
      },
      scoreOne: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      scoreTwo: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      scoreThree: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      comments: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("HackerReviews");
  }
};
