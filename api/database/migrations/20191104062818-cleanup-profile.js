"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "applicationSubmittedAt"),
      queryInterface.changeColumn("HackerProfiles", "status", {
        type: Sequelize.ENUM,
        values: [
          "unverified",
          "verified",
          "submitted",
          "accepted",
          "waitlisted",
          "rejected",
          "confirmed",
          "checkedIn"
        ],
        defaultValue: "unverified",
        allowNull: false
      }),
      queryInterface.addColumn("HackerProfiles", "marketing", {
        type: Sequelize.STRING(500)
      }),
      queryInterface.renameColumn(
        "HackerProfiles",
        "profileSubmittedAt",
        "submittedAt"
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "applicationSubmittedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.changeColumn("HackerProfiles", "status", {
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
      queryInterface.removeColumn("HackerProfiles", "marketing"),
      queryInterface.renameColumn(
        "HackerProfiles",
        "submittedAt",
        "profileSubmittedAt"
      )
    ]);
  }
};
