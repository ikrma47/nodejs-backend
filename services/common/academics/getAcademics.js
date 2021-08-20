const { Op } = require('sequelize');
var {
  Academics,
  ExamYears,
  Details,
} = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const { courseCategory } = await Details.findOne({
      where: { appId },
      attributes: ['courseCategory'],
    });
    const userAcademicRecords = await ExamYears.findAll({
      where: { examination: { [Op.ne]: `${courseCategory || 'MS'}` } },
      include: {
        model: Academics,
        through: {
          attributes: [],
          where: { appId },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: 'record fetched successfully',
      data: [...userAcademicRecords],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
