var { ApplicationStatus } = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;

  try {
    const applicationStatus = await ApplicationStatus.findOne({
      where: { appId },
      attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
    });
    res.status(200).json({ success: true, message: 'Application status fetched successfully', data: [applicationStatus] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
