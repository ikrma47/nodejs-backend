var { Experience } = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const experience = await Experience.findAll({
      where: { appId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({
      success: true,
      message: `${experience.length ? 'successfull' : 'no details found'}`,
      data: [...experience],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
