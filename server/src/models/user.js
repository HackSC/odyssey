export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    jwt: DataTypes.STRING,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    verifyCode: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};