function SemesterModel(sequelize, DataTypes) {
  const Semester = sequelize.define('semester', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Semester.associate = function association(model) {
    Semester.hasMany(model.semesterDetail);
  };
  return Semester;
}

module.exports = SemesterModel;
