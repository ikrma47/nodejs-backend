const { detail } = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const user = await detail.findOne({
      where: { appId },
      attributes: ['appId', 'name', 'image', 'courseCategory'],
    });
    res.status(200).json({
      success: true,
      message: 'fetch Successfully',
      data: [user],
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
