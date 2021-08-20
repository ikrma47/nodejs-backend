var {
  Departments, DepartmentCourse, Courses, OfferedProgram,
} = require('../../../models');
const getProgramsToBeOffered = require('./getProgramsToBeOffered');

module.exports = async (req, res) => {
  const programs = req.body;
  const { batchId } = req.params;
  try {
    programs.forEach(({ departmentName, courses }) => courses.forEach(
      ({ courseName, courseCategory }) => {
        DepartmentCourse.findOne({
          where: { courseCategory },
          attributes: ['id'],
          include: [{
            model: Departments,
            where: { departmentName },
            attributes: [],
          },
          {
            model: Courses,
            where: { courseName },
            attributes: [],
          },
          ],
        }).then(
          ({ id: departmentCourseId }) => OfferedProgram.create({ batchId, departmentCourseId }),
        )
          .then(() => { getProgramsToBeOffered(req, res); });
      },
    ));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server Error',
      data: [],
    });
  }
};
