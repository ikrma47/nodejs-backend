var {
  SemesterDetail, DepartmentCourse, Semester, AcademicTerm, Batch, Departments, Courses,
} = require('../../../models/models');

module.exports = async (req, res) => {
  try {
    const semestersDetails = await SemesterDetail.findAll({
      attributes: ['id'],
      include: [
        {
          model: Batch,
          attributes: ['id', 'year'],
          include: { model: AcademicTerm, attributes: ['id', 'termName'] },
        },
        { model: Semester, attributes: ['id', 'semester'] },
        { model: AcademicTerm, attributes: ['id', 'termName'] },
        {
          model: DepartmentCourse,
          attributes: ['id', 'courseCategory'],
          include: [
            { model: Departments },
            { model: Courses }],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'fetched',
      data: [...semestersDetails],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      data: [],
    });
  }
};
