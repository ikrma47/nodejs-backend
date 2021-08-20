function OfferedProgramModel(sequelize, DataTypes) {
  const OfferedProgram = sequelize.define('offeredProgram', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  OfferedProgram.associate = function association(model) {
    OfferedProgram.belongsTo(model.Batch);
    OfferedProgram.belongsTo(model.DepartmentCourse);
    OfferedProgram.belongsToMany(model.Preferences, { through: model.CoursePreference });
  };
  return OfferedProgram;
}

module.exports = OfferedProgramModel;
