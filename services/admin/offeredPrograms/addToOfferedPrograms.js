var {
  department, departmentCourse, course, offeredProgram,
} = require('../../../models');
const getProgramsToBeOffered = require('./getProgramsToBeOffered');

module.exports = async (req, res) => {
  const programs = req.body;
  const { batchId } = req.params;
  try {
    programs.forEach(({ departmentName, courses }) => courses.forEach(
      ({ courseName, courseCategory }) => {
        departmentCourse.findOne({
          where: { courseCategory },
          attributes: ['id'],
          include: [{
            model: department,
            where: { departmentName },
            attributes: [],
          },
          {
            model: course,
            where: { courseName },
            attributes: [],
          },
          ],
        }).then(
          ({ id: departmentCourseId }) => offeredProgram.create({ batchId, departmentCourseId }),
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
