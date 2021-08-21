function CoursePreferenceModel(sequelize, DataTypes) {
  const coursePreference = sequelize.define(
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

  coursePreference.associate = function association(model) {
    coursePreference.belongsTo(model.preference);
    coursePreference.belongsTo(model.offeredProgram);
    coursePreference.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });
  };
  return coursePreference;
}

module.exports = CoursePreferenceModel;
