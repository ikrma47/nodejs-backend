function DepartmentModel(sequelize, DataTypes) {
  var department = sequelize.define(
    'department',
    { departmentName: { type: DataTypes.STRING, allowNull: false } },
    { tableName: 'departments', timestamps: true, createdAt: true },
  );
  department.associate = function association(model) {
    department.belongsToMany(model.course, { through: model.departmentCourse });
  };

  return department;
}
module.exports = DepartmentModel;
