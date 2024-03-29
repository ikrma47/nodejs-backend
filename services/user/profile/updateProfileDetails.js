var {
  User, detail, address, phoneNumber,
} = require('../../../models');

module.exports = async (req, res) => {
  const {
    name,
    fatherName,
    dob,
    religion,
    domicile,
    personalNumber,
    optionalNumber,
    mailingAddress,
    residentialAddress,
  } = req.body;
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

    user.detail.name = name;
    user.detail.fatherName = fatherName;
    user.detail.dob = dob;
    user.detail.domicile = domicile;
    user.detail.religion = religion;
    user.detail.address.mailingAddress = mailingAddress;
    user.detail.address.residentialAddress = residentialAddress;
    user.detail.phoneNumber.personalNumber = personalNumber;
    user.detail.phoneNumber.optionalNumber = optionalNumber;

    await user.detail.save();
    await user.detail.address.save();
    await user.detail.phoneNumber.save();

    res.status(200).json({
      success: true,
      message: 'details inserted',
      data: [user],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server is down',
      data: [],
    });
  }
};
