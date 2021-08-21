function DetailModel(sequelize, DataTypes) {
  const detail = sequelize.define(
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

  detail.associate = function association(model) {
    detail.hasOne(model.phoneNumber, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
    detail.belongsTo(model.User, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
    detail.hasOne(model.address, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });
  };

  return detail;
}

module.exports = DetailModel;
