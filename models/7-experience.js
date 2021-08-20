function ExperienceModel(sequelize, DataTypes) {
  const experience = sequelize.define(
    'experience',
    {
      jobTitle: { type: DataTypes.STRING, allowNull: false },
      organization: { type: DataTypes.STRING, allowNull: false },
      from: { type: DataTypes.STRING, allowNull: false },
      to: { type: DataTypes.STRING, allowNull: false },
      salary: { type: DataTypes.BIGINT, allowNull: false },
      duty: { type: DataTypes.STRING, allowNull: false },
    },
    { freezeTableName: true, timestamps: true, createdAt: true },
  );

  experience.associate = function association(model) {
    experience.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });
  };

  return experience;
}
module.exports = ExperienceModel;
