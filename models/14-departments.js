function DepartmentModel(sequelize, DataTypes) {
  var Departments = sequelize.define(
    'department',
    { departmentName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'departments', timestamps: true, createdAt: true },
  );
  Departments.associate = function association(model) {
    Departments.belongsToMany(model.course, { through: model.departmentCourse });
  };

  return Departments;
}
module.exports = DepartmentModel;
