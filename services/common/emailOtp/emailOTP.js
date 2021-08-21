var { Op } = require('sequelize');
var utils = require('../../../lib/utils');
var { User } = require('../../../models');

module.exports = async (req, res) => {
  const { emailOrCnic } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrCnic }, { cnic: emailOrCnic }],
      },
    });
    if (user) {
      user.otp = utils.genOTP();
      await user.save();
      utils.sendOTP(user);
      setTimeout(async () => {
        user.otp = null;
        await user.save();
      }, 600000);
      res.status(200).json({
        success: true,
        message: 'OTP has been sent to your email address',
        data: [{ email: user.email }],
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'invalid Email or Cnic',
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
