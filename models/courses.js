function CoursesModel(sequelize, DataTypes) {
  const Courses = sequelize.define(
    'course',
    { courseName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'courses', timestamps: true, createdAt: true },
  );

  Courses.associate = function association(model) {
    Courses.belongsToMany(model.Departments, { through: model.DepartmentCourse });
    Courses.hasMany(model.DepartmentCourse);
    Courses.belongsToMany(model.Preferences, { through: model.CoursePreference });
    Courses.hasMany(model.CoursePreference);
  };

  const CoursePreference = sequelize.define(
    'coursePreference',
    { isSelected: { type: DataTypes.BOOLEAN, defaultValue: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  CoursePreference.associate = function association(model) {
    CoursePreference.belongsTo(model.Preferences);
    CoursePreference.belongsTo(model.Courses);
    CoursePreference.belongsTo(model.Departments);
    CoursePreference.belongsTo(model.Users, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });
  };

  const DepartmentCourse = sequelize.define(
    'departmentCourse',
    { courseCategory: { type: DataTypes.STRING, allowNull: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  DepartmentCourse.associate = function association(model) {
    DepartmentCourse.belongsTo(model.Departments);
    DepartmentCourse.belongsTo(model.Courses);
  };

  return { Courses, CoursePreference, DepartmentCourse };
}

module.exports = CoursesModel;
