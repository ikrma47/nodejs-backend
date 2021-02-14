var { ApplicationStatus, Details } = require('../../../models/models');

module.exports = async (req, res) => {
  try {
    const submittedApplications = await ApplicationStatus.findAll({
      where: { isSubmitted: true, isAccepted: false },
      attributes: ['appId'],
    });
    const acceptedApplications = await ApplicationStatus.findAll({
      where: { isAccepted: true },
      attributes: ['appId'],
    });
    const submittedAppIds = submittedApplications.map(({ appId }) => Number(appId));
    const acceptedAppIds = acceptedApplications.map(({ appId }) => Number(appId));

    const submittedApplicantsDetails = await Details.findAll({
      where: { appId: submittedAppIds.length > 0 ? submittedAppIds : [0] },
      attributes: ['appId', 'image', 'courseCategory', 'name'],
    });
    const acceptedApplicantsDetails = await Details.findAll({
      where: { appId: acceptedAppIds.length > 0 ? acceptedAppIds : [0] },
      attributes: ['appId', 'image', 'courseCategory', 'name'],
    });
    res.json({
      success: true,
      message: 'fetched successfully!',
      data: [{ submittedApplicantsDetails }, { acceptedApplicantsDetails }],
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
