function PreferenceModel(sequelize, DataTypes) {
  var preference = sequelize.define(
    'preference',
    { preference: { type: DataTypes.STRING, allowNull: false } },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  preference.associate = function association(model) {
    preference.belongsToMany(model.offeredProgram, { through: model.coursePreference });
    preference.hasMany(model.coursePreference);
  };

  return preference;
}
module.exports = PreferenceModel;
