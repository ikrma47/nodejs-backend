var { ApplicationStatus } = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const applicationStatus = await ApplicationStatus.update(
      { ...req.body },
      { where: { appId } },
    );
    if (applicationStatus) {
      res.json({
        success: true,
        message: 'successfully updated application status',
        data: [],
      });
    } else {
      res.status(400).json({
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
