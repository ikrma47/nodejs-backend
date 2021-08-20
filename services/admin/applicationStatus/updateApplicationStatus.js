var { ApplicationStatus } = require('../../../models');
var getApplicationStatus = require('../../common/applicationStatus/getApplicationStatus');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const applicationStatus = await ApplicationStatus.update(
      { ...req.body },
      { where: { appId } },
    );
    if (applicationStatus) {
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
