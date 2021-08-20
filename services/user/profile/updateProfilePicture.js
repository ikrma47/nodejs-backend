var {
  Users, Details, PhoneNumbers, Address,
} = require('../../../models');

module.exports = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const user = await Users.findOne({
      where: { appId: req.user.appId },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: Details,
          attributes: { exclude: ['updatedAt', 'createdAt'] },
          include: [
            { model: Address },
            { model: PhoneNumbers },
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
