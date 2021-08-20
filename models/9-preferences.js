function PreferenceModel(sequelize, DataTypes) {
  var preferences = sequelize.define(
    'preference',
    { preference: { type: DataTypes.STRING, allowNull: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  preferences.associate = function association(model) {
    preferences.belongsToMany(model.offeredProgram, { through: model.coursePreference });
    preferences.hasMany(model.coursePreference);
  };

  return preferences;
}
module.exports = PreferenceModel;
