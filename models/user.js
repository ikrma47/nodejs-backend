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
    Users.hasOne(model.ApplicationStatus, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    Users.hasMany(model.UploadedDocument, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    Users.hasMany(model.CoursePreference, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    Users.hasMany(model.Experience, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT },
    });

    Users.hasMany(model.UserAcademicRecords, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });

    Users.hasOne(model.Details, {
      sourceKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false, primaryKey: true, unique: true,
      },
    });

    Users.hasMany(model.SemesterEnrollment, {
      sourceKey: 'appId',
      foreignKey: { name: 'appId', type: DataTypes.BIGINT, allowNull: false },
    });
  };

  return { Users };
}

module.exports = UserModel;
