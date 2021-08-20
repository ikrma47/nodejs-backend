function AcademicTermModel(sequelize, DataTypes) {
  const AcademicTerm = sequelize.define('academicTerm', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    termName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  AcademicTerm.assoicate = function association(model) {
    AcademicTerm.hasMany(model.SemesterDetail);
    AcademicTerm.hasOne(model.Batch);
  };
  return AcademicTerm;
}

module.exports = AcademicTermModel;
