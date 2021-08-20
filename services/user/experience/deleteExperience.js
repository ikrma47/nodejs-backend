var { Experience } = require('../../../models');
var getExperience = require('../../common/experience/getExperience');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    await Experience.destroy({ where: { id } });
    getExperience({ params: { appId: req.user.appId } }, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'internal server error',
      data: [],
    });
  }
};
