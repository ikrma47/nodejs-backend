function SemesterDetailModel(sequelize, DataTypes) {
  const Batch = sequelize.define('batch', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAdmissionOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  Batch.associate = function association(model) {
    Batch.hasMany(model.SemesterDetail);
    Batch.hasMany(model.OfferedProgram);
    Batch.belongsTo(model.AcademicTerm);
    Batch.hasMany(model.Users);
  };

  const Semester = sequelize.define('semester', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Semester.associate = function association(model) {
    Semester.hasMany(model.SemesterDetail);
  };

  const AcademicTerm = sequelize.define('academicTerm', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    termName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  AcademicTerm.assoicate = function association(model) {
    AcademicTerm.hasMany(model.SemesterDetail);
    AcademicTerm.hasOne(model.Batch);
  };

  const SemesterDetail = sequelize.define('semesterDetail', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  SemesterDetail.associate = function association(model) {
    SemesterDetail.belongsTo(model.Batch);
    SemesterDetail.belongsTo(model.Semester);
    SemesterDetail.belongsTo(model.AcademicTerm);
    SemesterDetail.belongsTo(model.DepartmentCourse);
    SemesterDetail.hasMany(model.OfferedCourse);
    SemesterDetail.hasMany(model.SemesterEnrollment);
  };

  const SemesterCourse = sequelize.define('semesterCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creditHours: {
      type: DataTypes.INTEGER,
    },
    isUniversityElective: {
      type: DataTypes.BOOLEAN,
    },
    isStudentElective: {
      type: DataTypes.BOOLEAN,
    },
  });

  SemesterCourse.associate = function association(model) {
    SemesterCourse.belongsTo(model.DepartmentCourse);
    SemesterCourse.hasMany(model.OfferedCourse);
  };

  const OfferedCourse = sequelize.define('offeredCourse', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  OfferedCourse.associate = function association(model) {
    OfferedCourse.belongsTo(model.SemesterCourse);
    OfferedCourse.belongsTo(model.SemesterDetail);
  };

  const SemesterEnrollment = sequelize.define('semesterEnrollment', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  SemesterEnrollment.associate = function association(model) {
    SemesterEnrollment.belongsTo(model.SemesterDetail);
    SemesterEnrollment.belongsTo(model.Users, {
      targetKey: 'appId',
      foreignKey: {
        name: 'appId', type: DataTypes.BIGINT, allowNull: false,
      },
    });
  };

  const OfferedProgram = sequelize.define('offeredProgram', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
  });

  OfferedProgram.associate = function association(model) {
    OfferedProgram.belongsTo(model.Batch);
    OfferedProgram.belongsTo(model.DepartmentCourse);
    OfferedProgram.belongsToMany(model.Preferences, { through: model.CoursePreference });
  };

  return {
    Batch,
    Semester,
    AcademicTerm,
    OfferedCourse,
    SemesterDetail,
    SemesterCourse,
    OfferedProgram,
    SemesterEnrollment,
  };
}

module.exports = SemesterDetailModel;
