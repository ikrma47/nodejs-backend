var { Departments, Courses, DepartmentCourse } = require('../../../models');
var getCourse = require('./getCourse');

module.exports = async (req, res) => {
  try {
    const { departmentName, courseName, courseCategory } = req.body;
    const department = await Departments.findOne({ where: { departmentName } });
    if (department) {
      const course = await Courses.create({ courseName });
      await DepartmentCourse.create({
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
