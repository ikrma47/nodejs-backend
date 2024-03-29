var { applicationStatus } = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;

  try {
    const applicationstatus = await applicationStatus.findOne({
      where: { appId },
      attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
    });
    res.status(200).json({ success: true, message: 'Application status fetched successfully', data: [applicationstatus] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
