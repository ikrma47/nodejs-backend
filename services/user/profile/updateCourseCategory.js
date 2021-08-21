var {
  User, detail, address, phoneNumber,
} = require('../../../models');

module.exports = async (req, res) => {
  const { courseCategory } = req.body;
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

    user.detail.courseCategory = courseCategory;
    await user.detail.save();

    res
      .status(200)
      .json({ success: true, message: 'course category updated', data: [user] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
