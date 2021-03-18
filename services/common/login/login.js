var { Op } = require('sequelize');
var { Users } = require('../../../models/models');
var utils = require('../../../lib/utils');

module.exports = async (req, res) => {
  const { emailOrCnic, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { [Op.or]: [{ cnic: emailOrCnic }, { email: emailOrCnic }] },
    });
    if (user) {
      if (
        utils.verifyPassword({
          passwordFromUser: password,
          passwordHashFromDb: user.password,
        })
      ) {
        if (user.isVerified) {
          const token = utils.issueJwt(user.appId);
          res.status(200).json({
            success: true,
            message: 'logged in successfullys',
            data: [
              {
                token,
                isAdmin: user.isAdmin,
                appId: user.appId,
                email: user.email,
                isVerified: user.isVerified,
              },
            ],
          });
        } else {
          res.status(423).json({
            success: false,
            message: 'please verify your email first',
            data: [{ email: user.email }],
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: 'username or Password is incorrect',
          data: [],
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "The Email or Cnic You Entered Didn't match any account! :(",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'server error',
      data: [],
    });
  }
};
