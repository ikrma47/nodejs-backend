function PreferenceModel(sequelize, DataTypes) {
  var Preferences = sequelize.define(
    'preference',
    { preference: { type: DataTypes.STRING, allowNull: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  Preferences.associate = function association(model) {
    Preferences.belongsToMany(model.offeredProgram, { through: model.coursePreference });
    Preferences.hasMany(model.coursePreference);
  };

  return Preferences;
}
module.exports = PreferenceModel;
