var {
  Preferences, CoursePreference, Courses, Departments, OfferedProgram, DepartmentCourse,
} = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const preferences = await CoursePreference.findAll({
      where: { appId },
      attributes: [],
      include: [
        {
          model: OfferedProgram,
          attributes: ['id'],
          include: [
            {
              model: DepartmentCourse,
              attributes: ['id'],
              include: [
                { model: Courses, attributes: ['id', 'courseName'] },
                { model: Departments, attributes: ['id', 'departmentName'] },
              ],
            },
          ],
        },
        { model: Preferences, attributes: ['preference'] },
      ],
    });
    res.status(200).json({
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
