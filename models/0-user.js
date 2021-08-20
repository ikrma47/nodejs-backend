function UserModel(sequelize, DataTypes) {
  const Users = sequelize.define(
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

  Users.associate = function association(model) {
    Users.hasOne(model.applicationStatus, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    Users.hasMany(model.uploadedDocument, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    Users.hasMany(model.coursePreference, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    Users.hasMany(model.experience, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    Users.hasMany(model.userAcademicRecord, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    Users.hasOne(model.detail, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    Users.hasMany(model.semesterEnrollment, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    Users.belongsTo(model.batch);
  };

  return Users;
}

module.exports = UserModel;
