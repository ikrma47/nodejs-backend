var { Op } = require('sequelize');
const { passwordHash, genOTP, sendOTP } = require('../../../lib/utils');
var { Users } = require('../../../models');

module.exports = async (req, res) => {
  const { email, cnic, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { [Op.or]: [{ cnic }, { email }] },
    });
    if (user == null) {
      const newUser = await Users.create({
        email,
        cnic,
        password: passwordHash(password),
        isVerified: false,
        otp: genOTP(),
      });
      sendOTP(newUser);
      res.status(200).json({
        success: true,
        message:
          'Signed Up successfully! OTP has been sent to your email address. please login and verify it.',
        data: [],
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Email or Cnic is already registered',
        data: [],
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'server error! server error',
      data: [],
    });
  }
};
