function OfferedProgramModel(sequelize, DataTypes) {
  const offeredProgram = sequelize.define('offeredProgram', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  offeredProgram.associate = function association(model) {
    offeredProgram.belongsTo(model.batch);
    offeredProgram.belongsTo(model.departmentCourse);
    offeredProgram.belongsToMany(model.preference, { through: model.coursePreference });
  };
  return offeredProgram;
}

module.exports = OfferedProgramModel;
