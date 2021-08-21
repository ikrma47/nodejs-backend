function ExamYearModel(sequelize, DataTypes) {
  const examYear = sequelize.define(
    'examYear',
    {
      id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      examination: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'examYears', timestamps: false, createdAt: false },
  );

  examYear.associate = function association(model) {
    examYear.hasMany(model.userAcademicRecord);
    examYear.belongsToMany(model.academics, { through: model.userAcademicRecord });
  };
  return examYear;
}

module.exports = ExamYearModel;
