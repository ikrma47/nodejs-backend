var { department } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const departments = await department.findAll({
      attributes: ['id', 'departmentName'],
    });
    res.status(200).json({
      success: !!departments.length,
      message: `${departments.length ? 'successfully fetched' : 'no department found'}`,
      data: [...departments],
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
