var { Op } = require('sequelize');
var {
  Departments, OfferedProgram, DepartmentCourse, Details,
} = require('../../../models');

module.exports = async (req, res) => {
  const { batchId } = req.params;
  try {
    const { courseCategory = '%' } = await Details.findOne({
      attributes: ['courseCategory'],
      where: { appId: req.user.appId },
    });
    const data = await OfferedProgram.findAll({
      where: { batchId },
      attributes: ['id'],
      include: [{
        model: DepartmentCourse,
        attributes: ['id'],
        where: { courseCategory: { [Op.like]: courseCategory } },
        include: [{ model: Departments, attributes: ['id', 'departmentName'] }],
      }],
    });
    res.json({
      success: true,
      message: 'fetched',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
