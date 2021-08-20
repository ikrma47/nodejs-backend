function PreferenceModel(sequelize, DataTypes) {
  var Preferences = sequelize.define(
    'preference',
    { preference: { type: DataTypes.STRING, allowNull: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  Preferences.associate = function association(model) {
    Preferences.belongsToMany(model.OfferedProgram, { through: model.CoursePreference });
    Preferences.hasMany(model.CoursePreference);
  };

  return Preferences;
}
module.exports = PreferenceModel;
