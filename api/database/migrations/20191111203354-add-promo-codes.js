"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface
        .addColumn("HackerProfiles", "promoCode", {
          type: Sequelize.STRING(100),
          unique: true
        })
        .then(function() {
          return queryInterface.sequelize.query(`
            UPDATE HackerProfiles
            SET promoCode = (
                SELECT substring(MD5(RAND()), -8)
            )
            WHERE promoCode IS NULL;
          
          `);
        }),
      queryInterface.addColumn("HackerProfiles", "referrerCode", {
        type: Sequelize.STRING(100)
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("HackerProfiles", "promoCode"),
      queryInterface.removeColumn("HackerProfiles", "referrerCode")
    ]);
  }
};
