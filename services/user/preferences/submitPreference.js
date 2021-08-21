var {
  preference, coursePreference, course, offeredProgram, departmentCourse, detail, department,
} = require('../../../models');
var getPreferences = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference:userPreference, courseName, departmentName } = req.body;
  try {
    const { courseCategory } = await detail.findOne({ where: { appId: req.user.appId } });
    const { id: courseId } = await course.findOne({
      where: { courseName },
    });
    const { id: departmentId } = await department.findOne({
      where: { departmentName },
    });
    const { id: departmentCourseId } = await departmentCourse.findOne({
      where: { courseId, departmentId, courseCategory },
    });
    const { id: offeredProgramId } = await offeredProgram.findOne({
      where: { departmentCourseId, batchId: req.user.batchId },
    });
    const { id: preferenceId } = await preference.findOne({
      where: { preference:userPreference },
    });
    await coursePreference.findOrCreate({
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
