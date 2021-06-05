var {
  Preferences, CoursePreference, Courses,
} = require('../../../models/models');
var getPreferences = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference, courseName } = req.body;
  try {
    const { id: courseId } = await Courses.findOne({ where: { courseName } });
    const { id: preferenceId } = await Preferences.findOne({
      where: { preference },
    });
    await CoursePreference.findOrCreate({
      where: {
        courseId, preferenceId, appId: req.user.appId,
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
