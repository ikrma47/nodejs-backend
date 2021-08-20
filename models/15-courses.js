function CoursesModel(sequelize, DataTypes) {
  const Courses = sequelize.define(
    'course',
    { courseName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'courses', timestamps: true, createdAt: true },
  );

  Courses.associate = function association(model) {
    Courses.belongsToMany(model.department, { through: model.departmentCourse });
    Courses.hasMany(model.departmentCourse);
  };

  return Courses;
}

module.exports = CoursesModel;
