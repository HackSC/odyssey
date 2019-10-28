'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'HackerProfiles',
        'firstName',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'HackerProfiles',
        'lastName',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'HackerProfiles',
        'phoneNumber',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'HackerProfiles',
        'year',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'HackerProfiles',
        'skillLevel',
        Sequelize.STRING
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('HackerProfiles', 'firstName'),
      queryInterface.removeColumn('HackerProfiles', 'lastName'),
      queryInterface.removeColumn('HackerProfiles', 'phoneNumber'),
      queryInterface.removeColumn('HackerProfiles', 'year'),
      queryInterface.removeColumn('HackerProfiles', 'skillLevel'),
    ])
  }
};
