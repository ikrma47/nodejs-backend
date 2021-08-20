var {
  Batch, AcademicTerm, OfferedProgram, Departments, Courses, DepartmentCourse,
} = require('../../../models');

module.exports = async (req, res) => {
  try {
    const batch = await Batch.findAll({
      attributes: ['id', 'year'],
      order: [['year', 'DESC']],
      include: [
        {
          model: AcademicTerm,
          attributes: ['id', 'termName'],
        },
        {
          model: OfferedProgram,
          attributes: ['id'],
          required: true,
          include: [
            {
              model: DepartmentCourse,
              attributes: ['id', 'courseCategory'],
              include: [
                { model: Departments, attributes: ['id', 'departmentName'] },
                { model: Courses, attributes: ['id', 'courseName'] },
              ],
            },
          ],
        }],
    });
    if (batch.length > 0) {
      res.status(200).json({
        success: true,
        message: 'fetched successfully',
        data: [...batch],
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'cannot fetched batches',
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      mesage: 'server Error',
      data: [],
    });
  }
};
