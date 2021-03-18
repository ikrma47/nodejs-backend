function AcademicsModel(sequelize, DataTypes) {
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
    ExamYears.hasMany(model.UserAcademicRecords);
    ExamYears.belongsToMany(model.Academics, { through: model.UserAcademicRecords });
  };

  const Academics = sequelize.define(
    'academics',
    {
      id: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      yearHeld: { type: DataTypes.INTEGER },
      maxMarks: { type: DataTypes.INTEGER },
      obtainedMarks: { type: DataTypes.INTEGER },
      cgpa: { type: DataTypes.FLOAT },
      awards: { type: DataTypes.STRING },
      institute: { type: DataTypes.STRING },
      majors: { type: DataTypes.STRING },
    },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );
  Academics.associate = function association(model) {
    Academics.hasMany(model.UserAcademicRecords);
    Academics.belongsToMany(model.ExamYears, { through: model.UserAcademicRecords });
  };

  const UserAcademicRecords = sequelize.define(
    'userAcademicRecord',
    {},
    { tableName: 'userAcademicRecords', timestamps: true, createdAt: true },
  );
  UserAcademicRecords.associate = function association(model) {
    UserAcademicRecords.belongsTo(model.Academics);
    UserAcademicRecords.belongsTo(model.ExamYears);
    UserAcademicRecords.belongsTo(model.Users, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };

  return { ExamYears, Academics, UserAcademicRecords };
}
module.exports = AcademicsModel;
