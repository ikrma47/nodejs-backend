function ProfileModels(sequelize, DataTypes) {
  const PhoneNumbers = sequelize.define(
    'phoneNumber',
    {
      personalNumber: { type: DataTypes.STRING },
      optionalNumber: { type: DataTypes.STRING },
    },
    { tableName: 'phoneNumbers', timestamps: false, createdAt: false },
  );

  PhoneNumbers.associate = function association(model) {
    PhoneNumbers.belongsTo(model.Details, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };

  const Address = sequelize.define(
    'address',
    {
      mailingAddress: { type: DataTypes.STRING },
      residentialAddress: { type: DataTypes.STRING },
    },
    { freezeTableName: true, timestamps: false, createdAt: false },
  );

  Address.associate = function association(model) {
    Address.belongsTo(model.Details, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };

  const Details = sequelize.define(
    'detail',
    {
      name: { type: DataTypes.STRING },
      fatherName: { type: DataTypes.STRING },
      dob: { type: DataTypes.STRING },
      domicile: { type: DataTypes.STRING },
      religion: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      entryYear: { type: DataTypes.INTEGER },
      courseCategory: { type: DataTypes.STRING },
    },
    { tableName: 'details', timestamps: true, createdAt: true },
  );

  Details.associate = function association(model) {
    Details.hasOne(model.PhoneNumbers, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
    Details.belongsTo(model.Users, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
    Details.hasOne(model.Address, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };

  return { Details, PhoneNumbers, Address };
}

module.exports = ProfileModels;
