var { getApplications } = require('../applications/getApplications');

module.exports = async (req, res) => {
  try {
    const submittedApplicantsDetails = await getApplications({ ...req.query, isAccepted: false });
    const acceptedApplicantsDetails = await getApplications({ ...req.query, isAccepted: true });

    res.status(200).json({
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
