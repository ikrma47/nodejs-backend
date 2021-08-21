var {
  User, detail, phoneNumber, address,
} = require('../../../models');

module.exports = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const user = await User.findOne({
      where: { appId: req.user.appId },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: detail,
          attributes: { exclude: ['updatedAt', 'createdAt'] },
          include: [
            { model: address },
            { model: phoneNumber },
          ],
        },
      ],
    });

    user.detail.image = profilePicture;
    await user.detail.save();

    res
      .status(200)
      .json({ success: true, message: 'profile Picture updated', data: [user] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
