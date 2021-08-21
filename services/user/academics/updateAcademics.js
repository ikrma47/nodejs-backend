var {
  academics,
  examYear,
  userAcademicRecord,
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
    const examyear = await examYear.findOne({
      where: { examination },
      attributes: ['id'],
    });
    const useracademicRecord = await userAcademicRecord.findOne({
      where: { examYearId: examyear.id, appId: req.user.appId },
      attributes: ['academicId'],
    });

    await academics.update({
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
