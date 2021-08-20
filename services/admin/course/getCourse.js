var { Courses, DepartmentCourse, Departments } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const courses = await DepartmentCourse.findAll({
      attributes: ['courseCategory'],
      include: [
        { model: Courses, attributes: ['courseName'] },
        { model: Departments, attributes: ['departmentName'] },
      ],
    });
    if (courses.length > 0) {
      res.json({
        success: true,
        message: 'successfully fetched',
        data: [...courses],
      });
    } else {
      res.json({
        success: false,
        message: 'no Departments yet!',
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
