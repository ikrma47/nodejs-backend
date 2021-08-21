var { applicationStatus } = require('../../../models');
var getApplicationStatus = require('../../common/applicationStatus/getApplicationStatus');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const applicationstatus = await applicationStatus.update(
      { ...req.body },
      { where: { appId } },
    );
    if (applicationstatus) {
      getApplicationStatus(req, res);
    } else {
      res.status(404).json({
        success: false,
        message: 'something gone wrong try again!',
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
