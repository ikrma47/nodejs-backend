function SemesterModel(sequelize, DataTypes) {
  const semester = sequelize.define('semester', {
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

  semester.associate = function association(model) {
    semester.hasMany(model.semesterDetail);
  };
  return semester;
}

module.exports = SemesterModel;
