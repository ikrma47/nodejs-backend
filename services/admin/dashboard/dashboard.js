var { Departments } = require('../../../models/models');

module.exports = async (req, res) => {
  try {
    const departments = await Departments.findAll();
    res.json({
      success: true,
      message: '',
      data: [departments],
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
