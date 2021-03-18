var {
  Preferences, CoursePreference, Courses, Departments,
} = require('../../../models/models');
var getPreferences = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference, courseName, departmentName } = req.body;
  try {
    const { id: courseId } = await Courses.findOne({ where: { courseName } });
    const { id: departmentId } = await Departments.findOne({ where: { departmentName } });
    const { id: preferenceId } = await Preferences.findOne({
      where: { preference },
    });
    await CoursePreference.findOrCreate({
      where: {
        courseId, preferenceId, departmentId, appId: req.user.appId,
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
