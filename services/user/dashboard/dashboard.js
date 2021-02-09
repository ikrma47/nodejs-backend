const { Users, ApplicationStatus, Details } = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const user = await Users.findOne({
      where: { appId },
      attributes: [],
      include: [
        {
          model: ApplicationStatus,
          attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
        },
        {
          model: Details,
          attributes: ['name', 'image', 'courseCategory'],
        },
      ],
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
