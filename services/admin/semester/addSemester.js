var { AcademicTerm, Semester, SemesterDetail } = require('../../../models');
var getSemesters = require('./getSemesters');

module.exports = async (req, res) => {
  const {
    batchId, programId, semester, semesterTerm,
  } = req.body;
  console.log({
    batchId, programId, semester, semesterTerm,
  });
  try {
    const { id: semesterId } = await Semester.findOne({
      where: { semester },
      attributes: ['id'],
    });
    const { id: academicTermId } = await AcademicTerm.findOne({
      where: { termName: semesterTerm },
      attributes: ['id'],
    });
    if (semesterId && academicTermId) {
      const semesterDetails = await SemesterDetail.findOne({
        where: {
          semesterId, batchId, academicTermId, departmentCourseId: programId,
        },
      });
      if (!semesterDetails) {
        await SemesterDetail.create({
          semesterId, batchId, academicTermId, departmentCourseId: programId,
        });
        return await getSemesters(req, res);
      }
      return res.status(409).json({
        success: false,
        message: 'Already Exists',
        data: [],
      });
    }
    const error = { error: 'Something went wrong!!!!!!' };
    throw error;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
