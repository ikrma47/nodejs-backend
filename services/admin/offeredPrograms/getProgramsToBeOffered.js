var { Op } = require('sequelize');
var {
  OfferedProgram, Departments, Courses,
} = require('../../../models/models');

module.exports = async (req, res) => {
  const { batchId } = req.params;
  try {
    const ids = await OfferedProgram.findAll({
      attributes: ['departmentCourseId'],
      where: { batchId },
    });
    if (ids.length > 0) {
      const flattenedIds = ids.map(({ departmentCourseId }) => departmentCourseId);
      const departments = await Departments.findAll({
        attributes: ['id', 'departmentName'],
        include: [
          {
            right: true,
            model: Courses,
            attributes: ['id', 'courseName'],
            through: {
              attributes: ['id', 'courseCategory'],
              where: { id: { [Op.notIn]: flattenedIds } },
            },
          },
        ],
      });
      res.json({
        success: true,
        message: 'fetched Successfully',
        data: [...departments],
      });
    } else {
      const departments = await Departments.findAll({
        attributes: ['id', 'departmentName'],
        include: [
          {
            model: Courses,
            attributes: ['id', 'courseName'],
            through: {
              attributes: ['id', 'courseCategory'],
            },
          },
        ],
      });
      res.json({
        success: true,
        message: 'Fetched',
        data: [...departments],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
