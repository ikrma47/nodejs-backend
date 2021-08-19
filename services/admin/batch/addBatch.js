var {
  Batch,
  AcademicTerm,
} = require('../../../models/models');
var getBatches = require('./getBatches');

module.exports = async (req, res) => {
  const {
    batch, isAdmissionOpen, term,
  } = req.body;
  try {
    const { id } = await AcademicTerm.findOne({ where: { termName: term } });
    const batchData = await Batch.findOne({ where: { year: batch, academicTermId: id } });
    if (!batchData) {
      await Batch.create(
        { year: batch, isAdmissionOpen, academicTermId: id },
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
