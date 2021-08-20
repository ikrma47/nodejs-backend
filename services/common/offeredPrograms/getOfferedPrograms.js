var { Op } = require('sequelize');
var {
  OfferedProgram, DepartmentCourse, Courses, Departments,
} = require('../../../models');

module.exports = async (req, res) => {
  const { batchId } = req.params;
  try {
    const programIds = await OfferedProgram.findAll({ where: { batchId }, attributes: ['departmentCourseId'] });
    const flattenedIds = programIds.map((id) => id.departmentCourseId);
    const offeredPrograms = await DepartmentCourse.findAll({
      where: { id: { [Op.in]: flattenedIds } },
      attributes: ['id', 'courseCategory'],
      include: [
        { model: Courses, attributes: ['id', 'courseName'] },
        { model: Departments, attributes: ['id', 'departmentName'] },
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
