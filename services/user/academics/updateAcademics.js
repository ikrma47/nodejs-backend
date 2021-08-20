var {
  Academics,
  ExamYears,
  UserAcademicRecords,
} = require('../../../models');
var getAcademics = require('../../common/academics/getAcademics');

module.exports = async (req, res) => {
  const {
    yearHeld,
    maxMarks,
    obtainedMarks,
    cgpa,
    awards,
    institute,
    majors,
    examination,
  } = req.body;
  try {
    const examYear = await ExamYears.findOne({
      where: { examination },
      attributes: ['id'],
    });
    const useracademicRecord = await UserAcademicRecords.findOne({
      where: { examYearId: examYear.id, appId: req.user.appId },
      attributes: ['academicId'],
    });

    await Academics.update({
      yearHeld,
      maxMarks,
      obtainedMarks,
      cgpa,
      awards,
      institute,
      majors,
    }, { where: { id: useracademicRecord.academicId } });

    getAcademics({ params: { appId: req.user.appId } }, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
