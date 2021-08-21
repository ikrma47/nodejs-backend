var { Op } = require('sequelize');
var {
  department, offeredProgram, departmentCourse, detail,
} = require('../../../models');

module.exports = async (req, res) => {
  const { batchId } = req.params;
  try {
    const { courseCategory = '%' } = await detail.findOne({
      attributes: ['courseCategory'],
      where: { appId: req.user.appId },
    });
    const data = await offeredProgram.findAll({
      where: { batchId },
      attributes: ['id'],
      include: [{
        model: departmentCourse,
        attributes: ['id'],
        where: { courseCategory: { [Op.like]: courseCategory } },
        include: [{ model: department, attributes: ['id', 'departmentName'] }],
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
