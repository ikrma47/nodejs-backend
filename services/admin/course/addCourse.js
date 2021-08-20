var { department, course, departmentCourse } = require('../../../models');
var getCourse = require('./getCourse');

module.exports = async (req, res) => {
  try {
    const { departmentName, courseName, courseCategory } = req.body;
    const Department = await department.findOne({ where: { departmentName } });
    if (Department) {
      const Course = await course.create({ courseName });
      await departmentCourse.create({
        departmentId: Department.id,
        courseId: Course.id,
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
