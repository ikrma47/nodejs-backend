var { Op } = require('sequelize');
var {
  batch,
  academicTerm,
} = require('../../../models');
var getBatches = require('./getBatches');

module.exports = async (req, res) => {
  const {
    batch: batchYear, isAdmissionOpen, term,
  } = req.body;
  try {
    const { id } = await academicTerm.findOne({ where: { termName: term } });
    const batchData = await batch.findOne({
      where: {
        [Op.or]: [{ year: batchYear, academicTermId: id }, { isAdmissionOpen: true }],
      },
    });
    if (!batchData) {
      await batch.create(
        { year: batchYear, isAdmissionOpen, academicTermId: id },
      );
      return await getBatches(req, res);
    }
    return res.status(409).json({
      success: true,
      message: 'Already exist',
      data: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      body: [],
    });
  }
};
