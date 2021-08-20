function PhoneNumberModel(sequelize, DataTypes) {
  const PhoneNumbers = sequelize.define(
    'phoneNumber',
    {
      personalNumber: { type: DataTypes.STRING },
      optionalNumber: { type: DataTypes.STRING },
    },
    { tableName: 'phoneNumbers', timestamps: false, createdAt: false },
  );

  PhoneNumbers.associate = function association(model) {
    PhoneNumbers.belongsTo(model.detail, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };
  return PhoneNumbers;
}
module.exports = PhoneNumberModel;
