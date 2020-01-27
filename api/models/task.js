module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      points: DataTypes.INTEGER,
      description: DataTypes.STRING(100),
      blocking: DataTypes.BOOLEAN,
      type: DataTypes.STRING(100),
      isActive: DataTypes.BOOLEAN,
      name: DataTypes.STRING(100)
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Grouping);
  };
  return Task;
};
