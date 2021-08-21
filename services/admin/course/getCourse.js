var { course, departmentCourse, department } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const courses = await departmentCourse.findAll({
      attributes: ['courseCategory'],
      include: [
        { model: course, attributes: ['courseName'] },
        { model: department, attributes: ['departmentName'] },
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
        message: 'no department yet!',
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
