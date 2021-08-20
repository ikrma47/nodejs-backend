var { Op } = require('sequelize');
var { Users } = require('../../../models');

module.exports = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ otp }, { email }],
      },
    });
    if (user) {
      res.status(200).json({
        success: true,
        message: 'OTP is correct',
        data: [{ otp: user.otp, email: user.email }],
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'OTP is not correct',
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: 'server error',
      data: [],
    });
  }
};
