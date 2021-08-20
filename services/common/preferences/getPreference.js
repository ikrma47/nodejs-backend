var {
  preferences, coursePreference, course, department, offeredProgram, departmentCourse,
} = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const userPreferences = await coursePreference.findAll({
      where: { appId },
      attributes: [],
      include: [
        {
          model: offeredProgram,
          attributes: ['id'],
          include: [
            {
              model: departmentCourse,
              attributes: ['id'],
              include: [
                { model: course, attributes: ['id', 'courseName'] },
                { model: department, attributes: ['id', 'departmentName'] },
              ],
            },
          ],
        },
        { model: preferences, attributes: ['preference'] },
      ],
    });
    res.status(200).json({
      success: true,
      message:
        `${userPreferences.length ? 'fetched userPreferences successfully' : "you haven't applied yet"}`,
      data: [...userPreferences],
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
