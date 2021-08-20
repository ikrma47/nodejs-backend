function AcademicTermModel(sequelize, DataTypes) {
  const academicTerm = sequelize.define('academicTerm', {
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

  academicTerm.assoicate = function association(model) {
    academicTerm.hasMany(model.semesterDetail);
    academicTerm.hasOne(model.batch);
  };
  return academicTerm;
}

module.exports = AcademicTermModel;
