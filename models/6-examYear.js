function ExamYearModel(sequelize, DataTypes) {
  const ExamYears = sequelize.define(
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

  ExamYears.associate = function association(model) {
    ExamYears.hasMany(model.userAcademicRecord);
    ExamYears.belongsToMany(model.academics, { through: model.userAcademicRecord });
  };
  return ExamYears;
}

module.exports = ExamYearModel;
