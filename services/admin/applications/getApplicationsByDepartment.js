var {
  applicationStatus, User, department, coursePreference, course,
} = require('../../../models');

module.exports = async (req, res) => {
  const { departmentId } = req.params;
  try {
    const applications = await applicationStatus.findAll({
      where: { isSubmitted: true },
      include: [{
        model: User,
        attributes: ['name', 'courseCategory'],
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
