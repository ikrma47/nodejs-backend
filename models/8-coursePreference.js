function CoursePreferenceModel(sequelize, DataTypes) {
  const CoursePreference = sequelize.define(
    'coursePreference',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    { isSelected: { type: DataTypes.BOOLEAN, defaultValue: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  CoursePreference.associate = function association(model) {
    CoursePreference.belongsTo(model.preference);
    CoursePreference.belongsTo(model.offeredProgram);
    CoursePreference.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });
  };
  return CoursePreference;
}

module.exports = CoursePreferenceModel;
