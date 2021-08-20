var { experience } = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const experiences = await experience.findAll({
      where: { appId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({
      success: true,
      message: `${experiences.length ? 'successfull' : 'no details found'}`,
      data: [...experiences],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
