function DepartmentModel(sequelize, DataTypes) {
  var Departments = sequelize.define(
    'department',
    { departmentName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'departments', timestamps: true, createdAt: true },
  );
  Departments.associate = function association(model) {
    Departments.belongsToMany(model.Courses, { through: model.DepartmentCourse });
  };

  return { Departments };
}
module.exports = DepartmentModel;
