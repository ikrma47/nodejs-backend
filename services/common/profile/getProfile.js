var {
  User,
  address,
  phoneNumber,
  detail,
} = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const user = await User.findOne({
      where: { appId },
      attributes: ['email', 'cnic'],
      include: [
        {
          model: detail,
          attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
          include: [
            { model: address, attributes: { exclude: ['id', 'appId'] } },
            { model: phoneNumber, attributes: { exclude: ['id', 'appId'] } },
          ],
        },
      ],
    });
    res
      .status(200)
      .json({ success: true, message: 'successfully fetched', data: [user] });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: 'false',
      message: 'server error',
      data: [],
    });
  }
};
