var { Experience } = require('../../../models/models');
var getExperience = require('../../common/experience/getExperience');

module.exports = async (req, res) => {
  const {
    jobTitle, organization, from, to, salary, duty,
  } = req.body;
  try {
    if (
      !(await Experience.findOne({
        where: {
          jobTitle,
          organization,
          from,
          to,
          salary,
          duty,
          appId: req.user.appId,
        },
      }))
    ) {
      await Experience.create({
        jobTitle,
        organization,
        from,
        to,
        salary,
        duty,
        appId: req.user.appId,
      });
      getExperience({ params: { appId: req.user.appId } }, res);
    } else {
      res.status(200).json({
        success: true,
        message: 'these details are already inserted',
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      data: [],
    });
  }
};
