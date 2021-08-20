var { Op } = require('sequelize');
var {
  Departments, Courses, DepartmentCourse, Details, CoursePreference, OfferedProgram,
} = require('../../../models');

module.exports = async (req, res) => {
  try {
    const { courseCategory } = await Details.findOne({
      where: { appId: req.user.appId }, attributes: ['courseCategory'],
    });
    const appliedCourses = await CoursePreference.findAll({
      // attributes: ['offeredProgramId'],
      where: { appId: req.user.appId },
    });
    const ids = appliedCourses?.map(({ offeredProgramId }) => Number(offeredProgramId));
    const offeredCourses = await OfferedProgram.findAll({
      where: {
        // id: { [Op.ne]: ids }
        batchId: req.user.batchId,
        [Op.not]: [{ id: ids.length > 0 ? ids : [0] }],
      },
      attributes: [],
      include: [{
        model: DepartmentCourse,
        attributes: ['id'],
        where: { courseCategory },
        include: [
          { model: Departments, attributes: ['id', 'departmentName'] },
          { model: Courses, attributes: ['id', 'courseName'] },
        ],
      }],
    });
    res.json({
      success: !!offeredCourses.length,
      message: `${offeredCourses.length > 0 ? 'successfully fetched' : 'no course found'}`,
      data: [...offeredCourses],
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
