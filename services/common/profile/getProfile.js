var {
  Users,
  Address,
  PhoneNumbers,
  Details,
} = require('../../../models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const user = await Users.findOne({
      where: { appId },
      attributes: ['email', 'cnic'],
      include: [
        {
          model: Details,
          attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
          include: [
            { model: Address, attributes: { exclude: ['id', 'appId'] } },
            { model: PhoneNumbers, attributes: { exclude: ['id', 'appId'] } },
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
