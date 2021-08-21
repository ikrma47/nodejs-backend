function PhoneNumberModel(sequelize, DataTypes) {
  const phoneNumber = sequelize.define(
    'phoneNumber',
    {
      personalNumber: { type: DataTypes.STRING },
      optionalNumber: { type: DataTypes.STRING },
    },
    { tableName: 'phoneNumbers', timestamps: false, createdAt: false },
  );

  phoneNumber.associate = function association(model) {
    phoneNumber.belongsTo(model.detail, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };
  return phoneNumber;
}
module.exports = PhoneNumberModel;
