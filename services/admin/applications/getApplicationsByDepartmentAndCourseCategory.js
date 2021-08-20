var {
  applicationStatus, User, department, coursePreference, course,
} = require('../../../models');

module.exports = async (req, res) => {
  const { departmentId, courseCategory } = req.params;
  try {
    const applications = await applicationStatus.findAll({
      where: { isSubmitted: true },
      include: [{
        model: User,
        where: { courseCategory },
        attributes: ['name'],
      }, {
        model: department,
        where: { id: departmentId },
      }, {
        model: coursePreference,
        attributes: [],
        include: [course],
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
