function AddressModel(sequelize, DataTypes) {
  const address = sequelize.define(
    'address',
    {
      mailingAddress: { type: DataTypes.STRING },
      residentialAddress: { type: DataTypes.STRING },
    },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  address.associate = function association(model) {
    address.belongsTo(model.detail, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };
  return address;
}

module.exports = AddressModel;
