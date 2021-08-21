function BatchModel(sequelize, DataTypes) {
  const batch = sequelize.define('batch', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAdmissionOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  batch.associate = function association(model) {
    batch.hasMany(model.semesterDetail);
    batch.hasMany(model.offeredProgram);
    batch.belongsTo(model.academicTerm);
    batch.hasMany(model.User);
  };
  return batch;
}
module.exports = BatchModel;
