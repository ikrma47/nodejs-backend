var { department, course, departmentCourse } = require('../../../models');
var getCourse = require('./getCourse');

module.exports = async (req, res) => {
  try {
    const { departmentName, courseName, courseCategory } = req.body;
    const department = await department.findOne({ where: { departmentName } });
    if (department) {
      const course = await course.create({ courseName });
      await departmentCourse.create({
        departmentId: department.id,
        courseId: course.id,
        courseCategory,
      });
    }
    getCourse(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
