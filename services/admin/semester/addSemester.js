var { academicTerm, semester, semesterDetail } = require('../../../models');
var getSemesters = require('./getSemesters');

module.exports = async (req, res) => {
  const {
    batchId, programId, semester, semesterTerm,
  } = req.body;
  console.log({
    batchId, programId, semester, semesterTerm,
  });
  try {
    const { id: semesterId } = await semester.findOne({
      where: { semester },
      attributes: ['id'],
    });
    const { id: academicTermId } = await academicTerm.findOne({
      where: { termName: semesterTerm },
      attributes: ['id'],
    });
    if (semesterId && academicTermId) {
      const semesterDetails = await semesterDetail.findOne({
        where: {
          semesterId, batchId, academicTermId, departmentCourseId: programId,
        },
      });
      if (!semesterDetails) {
        await semesterDetail.create({
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
