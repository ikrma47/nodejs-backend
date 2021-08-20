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
    Batch.hasMany(model.SemesterDetail);
    Batch.hasMany(model.OfferedProgram);
    Batch.belongsTo(model.AcademicTerm);
    Batch.hasMany(model.Users);
  };
  return Batch;
}
module.exports = BatchModel;
