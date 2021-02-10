var { ApplicationStatus, Details } = require('../../../models/models');

module.exports = async (req, res) => {
  try {
    const submittedApplications = await ApplicationStatus.findAll({
      where: { isSubmitted: true },
      attributes: ['appId'],
    });
    const appIds = submittedApplications.map(({ appId }) => Number(appId));

    const applicantsDetails = await Details.findAll({
      where: { appId: appIds.length > 0 ? appIds : [0] },
      attributes: ['appId', 'image', 'courseCategory', 'name'],
    });
    res.json({
      success: true,
      message: 'fetched successfully!',
      data: [...applicantsDetails],
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
