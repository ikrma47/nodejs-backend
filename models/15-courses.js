function CoursesModel(sequelize, DataTypes) {
  const course = sequelize.define(
    'course',
    { courseName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'courses', timestamps: true, createdAt: true },
  );

  course.associate = function association(model) {
    course.belongsToMany(model.department, { through: model.departmentCourse });
    course.hasMany(model.departmentCourse);
  };

  return course;
}

module.exports = CoursesModel;
