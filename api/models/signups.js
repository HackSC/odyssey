// If you make any changes to signups, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
module.exports = (sequelize, DataTypes) => {
  const signups = sequelize.define(
    "signups",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { timestamps: false }
  );

  signups.prototype.getSignUps = function() {
    return sequelize.models.signups.findAll({});
  };
  return signups;
};
