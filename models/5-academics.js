function AcademicsModel(sequelize, DataTypes) {
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
    Academics.hasMany(model.userAcademicRecord);
    Academics.belongsToMany(model.examYear, { through: model.userAcademicRecord });
  };

  return Academics;
}
module.exports = AcademicsModel;
