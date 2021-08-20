function BatchModel(sequelize, DataTypes) {
  const Batch = sequelize.define('batch', {
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

  Batch.associate = function association(model) {
    Batch.hasMany(model.semesterDetail);
    Batch.hasMany(model.offeredProgram);
    Batch.belongsTo(model.academicTerm);
    Batch.hasMany(model.User);
  };
  return Batch;
}
module.exports = BatchModel;
