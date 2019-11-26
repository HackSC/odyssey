module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      points: DataTypes.INTEGER,
      description: DataTypes.STRING(100),
      blocking: DataTypes.BOOLEAN
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
