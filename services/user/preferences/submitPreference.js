var {
  Preferences, CoursePreference, Courses, OfferedProgram, DepartmentCourse, Details, Departments,
} = require('../../../models');
var getPreferences = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference, courseName, departmentName } = req.body;
  try {
    const { courseCategory } = await Details.findOne({ where: { appId: req.user.appId } });
    const { id: courseId } = await Courses.findOne({
      where: { courseName },
    });
    const { id: departmentId } = await Departments.findOne({
      where: { departmentName },
    });
    const { id: departmentCourseId } = await DepartmentCourse.findOne({
      where: { courseId, departmentId, courseCategory },
    });
    const { id: offeredProgramId } = await OfferedProgram.findOne({
      where: { departmentCourseId, batchId: req.user.batchId },
    });
    const { id: preferenceId } = await Preferences.findOne({
      where: { preference },
    });
    await CoursePreference.findOrCreate({
      where: {
        offeredProgramId, preferenceId, appId: req.user.appId,
      },
    });
    getPreferences({ params: { appId: req.user.appId } }, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
