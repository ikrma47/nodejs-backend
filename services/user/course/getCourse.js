var { Op } = require('sequelize');
var {
  Departments, Courses, DepartmentCourse, Details, CoursePreference,
} = require('../../../models/models');

module.exports = async (req, res) => {
  try {
    const { courseCategory } = await Details.findOne({
      where: { appId: req.user.appId }, attributes: ['courseCategory'],
    });
    const appliedCourses = await CoursePreference.findAll({
      attributes: ['courseId'],
      where: { appId: req.user.appId },
    });
    const ids = appliedCourses?.map((course) => course?.courseId);
    const departmentCourses = await DepartmentCourse.findAll({
      where: {
        courseCategory,
        // courseId: { [Op.ne]: ids }
        [Op.not]: [{ courseId: ids.length > 0 ? ids : [0] }],
      },
      attributes: [],
      include: [
        { model: Courses, attributes: ['id', 'courseName'] },
        { model: Departments, attributes: ['departmentName'] },
      ],
    });
    res.json({
      success: `${departmentCourses.length > 0}`,
      message: `${departmentCourses.length > 0 ? 'successfully fetched' : 'no course found'}`,
      data: [...departmentCourses],
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
