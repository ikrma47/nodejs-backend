var { applicationStatus } = require('../../../models');

module.exports = async (req, res) => {
  try {
    const applicationStatus = await applicationStatus.update({ ...req.body }, {
      where: { appId: req.user.appId },
      returning: true,
    });

    res.status(200).json({ success: true, message: 'Application status updated successfully', data: [applicationStatus[1][0]] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
