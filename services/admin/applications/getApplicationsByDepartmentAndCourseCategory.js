var {
  ApplicationStatus, Users, Departments, CoursePreference, Courses,
} = require('../../../models');

module.exports = async (req, res) => {
  const { departmentId, courseCategory } = req.params;
  try {
    const applications = await ApplicationStatus.findAll({
      where: { isSubmitted: true },
      include: [{
        model: Users,
        where: { courseCategory },
        attributes: ['name'],
      }, {
        model: Departments,
        where: { id: departmentId },
      }, {
        model: CoursePreference,
        attributes: [],
        include: [Courses],
      }],
    });
    res.json({
      success: true,
      message: 'successfully fetched',
      data: [...applications],
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
