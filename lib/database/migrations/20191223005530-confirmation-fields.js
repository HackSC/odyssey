"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "travelOrigin", {
        type: Sequelize.STRING(500),
      }),
      queryInterface.addColumn("HackerProfiles", "travelMethod", {
        type: Sequelize.ENUM,
        values: ["driving", "bus", "flying", "usc", "other"],
      }),
      queryInterface.addColumn("HackerProfiles", "travelPlan", {
        type: Sequelize.STRING(500),
      }),
      queryInterface.addColumn("HackerProfiles", "dietaryRestrictions", {
        type: Sequelize.STRING(1000),
      }),
      queryInterface.addColumn("HackerProfiles", "confirmCodeOfConduct", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("HackerProfiles", "shirtSize", {
        type: Sequelize.ENUM,
        values: ["xs", "s", "m", "l", "xl"],
      }),
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
          "declined",
          "checkedIn",
        ],
        defaultValue: "unverified",
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "travelOrigin"),
      queryInterface.removeColumn("HackerProfiles", "travelMethod"),
      queryInterface.removeColumn("HackerProfiles", "travelPlan"),
      queryInterface.removeColumn("HackerProfiles", "dietaryRestrictions"),
      queryInterface.removeColumn("HackerProfiles", "shirtSize"),
      queryInterface.removeColumn("HackerProfiles", "confirmCodeOfConduct"),
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
          "checkedIn",
        ],
        defaultValue: "unverified",
        allowNull: false,
      }),
    ]);
  },
};
