function DetailModel(sequelize, DataTypes) {
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

  return Details;
}

module.exports = DetailModel;
