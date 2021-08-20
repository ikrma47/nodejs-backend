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
    OfferedProgram.belongsTo(model.batch);
    OfferedProgram.belongsTo(model.departmentCourse);
    OfferedProgram.belongsToMany(model.preference, { through: model.coursePreference });
  };
  return OfferedProgram;
}

module.exports = OfferedProgramModel;
