function UserModel(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      appId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      email: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      cnic: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
      otp: { type: DataTypes.INTEGER, allowNull: true },
      isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: 'users', timestamps: true, createdAt: true, updatedAt: true,
    },
  );

  User.associate = function association(model) {
    User.hasOne(model.applicationStatus, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    User.hasMany(model.uploadedDocument, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    User.hasMany(model.coursePreference, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    User.hasMany(model.experience, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    User.hasMany(model.userAcademicRecord, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    User.hasOne(model.detail, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    User.hasMany(model.semesterEnrollment, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    User.belongsTo(model.batch);
  };

  return User;
}

module.exports = UserModel;
