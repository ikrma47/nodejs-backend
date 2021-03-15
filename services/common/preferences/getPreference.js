var {
  Preferences, CoursePreference, Courses, Departments,
} = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const preferences = await CoursePreference.findAll({
      where: { appId },
      attributes: [],
      include: [
        { model: Courses, attributes: ['courseName'] },
        { model: Departments, attributes: ['departmentName'] },
        { model: Preferences, attributes: ['preference'] },
      ],
    });
    res.json({
      success: true,
      message:
        `${preferences.length ? 'fetched preferences successfully' : "you haven't applied yet"}`,
      data: [...preferences],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
