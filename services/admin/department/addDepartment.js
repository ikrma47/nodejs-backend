var { Departments } = require('../../../models/models');
var getDepartment = require('../../common/department/getDepartment');

module.exports = async (req, res) => {
  const { departmentName } = req.body;
  try {
    await Departments.findOrCreate({ where: { departmentName } });
    getDepartment(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
