var { Op } = require('sequelize');
var {
  department, course, departmentCourse, detail, coursePreference, offeredProgram,
} = require('../../../models');

module.exports = async (req, res) => {
  try {
    const { courseCategory } = await detail.findOne({
      where: { appId: req.user.appId }, attributes: ['courseCategory'],
    });
    const appliedCourses = await coursePreference.findAll({
      // attributes: ['offeredProgramId'],
      where: { appId: req.user.appId },
    });
    const ids = appliedCourses?.map(({ offeredProgramId }) => Number(offeredProgramId));
    const offeredCourses = await offeredProgram.findAll({
      where: {
        // id: { [Op.ne]: ids }
        batchId: req.user.batchId,
        [Op.not]: [{ id: ids.length > 0 ? ids : [0] }],
      },
      attributes: [],
      include: [{
        model: departmentCourse,
        attributes: ['id'],
        where: { courseCategory },
        include: [
          { model: department, attributes: ['id', 'departmentName'] },
          { model: course, attributes: ['id', 'courseName'] },
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
