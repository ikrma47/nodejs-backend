var {
  preference, coursePreference,
} = require('../../../models');
var getPreference = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference: userPreference } = req.params;
  try {
    const { id: preferenceId } = await preference.findOne({ where: { preference:userPreference } });
    await coursePreference.destroy({
      where: { appId: req.user.appId, preferenceId },
    });
    getPreference({ params: { appId: req.user.appId } }, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
