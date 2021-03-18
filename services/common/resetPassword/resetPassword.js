var { Op } = require('sequelize');
var { Users } = require('../../../models/models');
var utils = require('../../../lib/utils');

module.exports = async (req, res) => {
  const {
    otp, email, password, confirmPassword,
  } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ otp }, { email }],
      },
    });
    if (user) {
      if (password == confirmPassword) {
        user.password = utils.passwordHash(password);
        user.otp = null;
        await user.save();
        res.status(200).json({
          success: true,
          message: 'password updated successfully',
          data: [],
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'passwords did not match',
          data: [],
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'something went wrong',
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
