var { batch, academicTerm } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const batch = await batch.findAll({
      attributes: ['id', 'isAdmissionOpen', 'year'],
      order: [['year', 'DESC']],
      include: [{
        model: academicTerm,
        attributes: ['id', 'termName'],
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
