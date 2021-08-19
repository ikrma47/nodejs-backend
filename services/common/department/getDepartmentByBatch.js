var {
  Departments, Batch, OfferedProgram, DepartmentCourse,
} = require('../../../models/models');

module.exports = async (req, res) => {
  const { batchYear } = req.params;
  try {
    const data = await Batch.findAll({
      where: { year: batchYear },
      include: [{
        model: OfferedProgram,
        include: [{
          model: DepartmentCourse,
          include: [Departments],
        }],
      }],
    });
    console.log(data.toJson());
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
