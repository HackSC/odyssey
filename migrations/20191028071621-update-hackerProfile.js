"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "applicationSubmittedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("HackerProfiles", "profileSubmittedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("HackerProfiles", "status", {
        type: Sequelize.ENUM,
        values: [
          "unverified",
          "verified",
          "profileSubmitted",
          "applicationSubmitted",
          "accepted",
          "waitlisted",
          "rejected",
          "confirmed",
          "checkedIn"
        ],
        defaultValue: "unverified",
        allowNull: false
      }),
      queryInterface.addColumn("HackerProfiles", "firstName", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("HackerProfiles", "lastName", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("HackerProfiles", "phoneNumber", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("HackerProfiles", "school", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("HackerProfiles", "year", {
        type: Sequelize.ENUM,
        values: ["Freshman", "Sophomore", "Junior", "Senior"]
      }),
      queryInterface.addColumn("HackerProfiles", "skillLevel", {
        type: Sequelize.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"]
      }),
      queryInterface.addColumn("HackerProfiles", "questionOne", {
        type: Sequelize.STRING(1000)
      }),
      queryInterface.addColumn("HackerProfiles", "questionTwo", {
        type: Sequelize.STRING(1000)
      }),
      queryInterface.addColumn("HackerProfiles", "questionThree", {
        type: Sequelize.STRING(1000)
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "applicationSubmittedAt"),
      queryInterface.removeColumn("HackerProfiles", "profileSubmittedAt"),
      queryInterface.removeColumn("HackerProfiles", "status"),
      queryInterface.removeColumn("HackerProfiles", "firstName"),
      queryInterface.removeColumn("HackerProfiles", "lastName"),
      queryInterface.removeColumn("HackerProfiles", "phoneNumber"),
      queryInterface.removeColumn("HackerProfiles", "school"),
      queryInterface.removeColumn("HackerProfiles", "year"),
      queryInterface.removeColumn("HackerProfiles", "skillLevel"),
      queryInterface.removeColumn("HackerProfiles", "questionOne"),
      queryInterface.removeColumn("HackerProfiles", "questionTwo"),
      queryInterface.removeColumn("HackerProfiles", "questionThree")
    ]);
  }
};
