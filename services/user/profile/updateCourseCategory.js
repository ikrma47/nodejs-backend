var {
  Users, Details, Address, PhoneNumbers,
} = require('../../../models/models');

module.exports = async (req, res) => {
  const { courseCategory } = req.body;
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
