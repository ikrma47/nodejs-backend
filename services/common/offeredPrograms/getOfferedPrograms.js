var { Op } = require('sequelize');
var {
  offeredProgram, departmentCourse, course, department,
} = require('../../../models');

module.exports = async (req, res) => {
  const { batchId } = req.params;
  try {
    const programIds = await offeredProgram.findAll({ where: { batchId }, attributes: ['departmentCourseId'] });
    const flattenedIds = programIds.map((id) => id.departmentCourseId);
    const offeredPrograms = await departmentCourse.findAll({
      where: { id: { [Op.in]: flattenedIds } },
      attributes: ['id', 'courseCategory'],
      include: [
        { model: course, attributes: ['id', 'courseName'] },
        { model: department, attributes: ['id', 'departmentName'] },
      ],
    });
    res.status(200).json({
      success: true,
      message: 'fetched',
      data: [...offeredPrograms],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server Error',
      data: [],
    });
  }
};
