var { Op } = require('sequelize');
const { issueJwt } = require('../../../lib/utils');
var {
  User,
  batch,
  applicationStatus,
  detail,
  address,
  phoneNumber,
  userAcademicRecord,
  academics,
  examYear,
  uploadedDocument,
} = require('../../../models');

module.exports = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ otp }, { email }],
      },
    });
    if (user) {
      const batch = await batch.findOne({ where: { isAdmissionOpen: true } });
      user.otp = null;
      user.isVerified = true;
      user.batchId = batch.id;

      await applicationStatus.create({ appId: user.appId });
      await detail.create({ appId: user.appId });
      await address.create({ appId: user.appId });
      await phoneNumber.create({ appId: user.appId });
      await uploadedDocument.create({ appId: user.appId });

      const [
        firstYear,
        secondYear,
        thirdYear,
        finalYear,
        gat,
        ms,
      ] = await examYear.findAll();

      const [
        firstYearAcademics,
        secondYearAcademics,
        thirdYearAcademics,
        finalYearAcademics,
        gatAcademics,
        msAcademics,
      ] = await academics.bulkCreate([{}, {}, {}, {}, {}, {}], { returning: true });

      await userAcademicRecord.bulkCreate([
        { appId: user.appId, academicId: firstYearAcademics.id, examYearId: firstYear.id },
        { appId: user.appId, academicId: secondYearAcademics.id, examYearId: secondYear.id },
        { appId: user.appId, academicId: thirdYearAcademics.id, examYearId: thirdYear.id },
        { appId: user.appId, academicId: finalYearAcademics.id, examYearId: finalYear.id },
        { appId: user.appId, academicId: gatAcademics.id, examYearId: gat.id },
        { appId: user.appId, academicId: msAcademics.id, examYearId: ms.id },
      ]);

      const token = issueJwt(user.appId);
      await user.save();
      res.json({
        success: true,
        message: 'Email verified successfully',
        data: [
          {
            token,
            isAdmin: user.isAdmin,
            appId: user.appId,
            isVerified: user.isVerified,
            batchId: user.batchId,
          },
        ],
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'please enter a valid otp',
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
