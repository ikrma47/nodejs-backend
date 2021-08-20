var {
  batch, academicTerm, offeredProgram, department, course, departmentCourse,
} = require('../../../models');

module.exports = async (req, res) => {
  try {
    const batch = await batch.findAll({
      attributes: ['id', 'year'],
      order: [['year', 'DESC']],
      include: [
        {
          model: academicTerm,
          attributes: ['id', 'termName'],
        },
        {
          model: offeredProgram,
          attributes: ['id'],
          required: true,
          include: [
            {
              model: departmentCourse,
              attributes: ['id', 'courseCategory'],
              include: [
                { model: department, attributes: ['id', 'departmentName'] },
                { model: course, attributes: ['id', 'courseName'] },
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
