function AddressModel(sequelize, DataTypes) {
  const Address = sequelize.define(
    'address',
    {
      mailingAddress: { type: DataTypes.STRING },
      residentialAddress: { type: DataTypes.STRING },
    },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  Address.associate = function association(model) {
    Address.belongsTo(model.detail, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };
  return Address;
}

module.exports = AddressModel;
