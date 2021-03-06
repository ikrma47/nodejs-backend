var {
  Preferences, CoursePreference,
} = require('../../../models/models');
var getPreference = require('../../common/preferences/getPreference');

module.exports = async (req, res) => {
  const { preference } = req.params;
  try {
    const { id: preferenceId } = await Preferences.findOne({ where: { preference } });
    await CoursePreference.destroy({
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
