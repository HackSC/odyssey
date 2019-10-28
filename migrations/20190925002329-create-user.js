export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      id: {
        autoincrement: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jwt: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      verifyCode: {
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
    return queryInterface.dropTable("Users");
  }
};