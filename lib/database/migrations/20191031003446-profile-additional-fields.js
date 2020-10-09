"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("HackerProfiles", "graduationDate", {
        type: Sequelize.ENUM,
        values: [
          "spring-2020",
          "fall-2020",
          "spring-2021",
          "fall-2021",
          "spring-2022",
          "fall-2022",
          "spring-2023",
          "fall-2023",
          "other",
        ],
      }),
      queryInterface.addColumn("HackerProfiles", "over18", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("HackerProfiles", "needBus", {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn("HackerProfiles", "links", {
        type: Sequelize.STRING(1000),
      }),
      queryInterface.changeColumn("HackerProfiles", "role", {
        type: Sequelize.ENUM,
        values: ["hacker", "admin", "sponsor", "superadmin"],
        defaultValue: "hacker",
      }),
      queryInterface.changeColumn("HackerProfiles", "year", {
        type: Sequelize.ENUM,
        values: ["freshman", "sophomore", "junior", "senior", "graduate"],
      }),
      queryInterface.changeColumn("HackerProfiles", "gender", {
        type: Sequelize.ENUM,
        values: ["male", "female", "non-binary", "other", "no-say"],
      }),
      queryInterface.changeColumn("HackerProfiles", "skillLevel", {
        type: Sequelize.ENUM,
        values: ["beginner", "intermediate", "advanced"],
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "graduationDate"),
      queryInterface.removeColumn("HackerProfiles", "over18"),
      queryInterface.removeColumn("HackerProfiles", "needBus"),
      queryInterface.removeColumn("HackerProfiles", "links"),
      queryInterface.changeColumn("HackerProfiles", "role", {
        type: Sequelize.ENUM,
        values: ["hacker", "admin", "sponsor", "superadmin"],
      }),
      queryInterface.changeColumn("HackerProfiles", "year", {
        type: Sequelize.ENUM,
        values: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"],
      }),
      queryInterface.changeColumn("HackerProfiles", "gender", {
        type: Sequelize.ENUM,
        values: ["male", "female", "other"],
      }),
      queryInterface.changeColumn("HackerProfiles", "skillLevel", {
        type: Sequelize.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"],
      }),
    ]);
  },
};
