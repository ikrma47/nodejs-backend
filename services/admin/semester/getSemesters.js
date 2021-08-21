var {
  semesterDetail, departmentCourse, semester, academicTerm, batch, department, course,
} = require('../../../models');

module.exports = async (req, res) => {
  try {
    const semestersDetails = await semesterDetail.findAll({
      attributes: ['id'],
      include: [
        {
          model: batch,
          attributes: ['id', 'year'],
          include: { model: academicTerm, attributes: ['id', 'termName'] },
        },
        { model: semester, attributes: ['id', 'semester'] },
        { model: academicTerm, attributes: ['id', 'termName'] },
        {
          model: departmentCourse,
          attributes: ['id', 'courseCategory'],
          include: [
            { model: department },
            { model: course }],
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
