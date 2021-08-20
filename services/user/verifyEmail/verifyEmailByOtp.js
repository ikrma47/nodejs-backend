var { Op } = require('sequelize');
const { issueJwt } = require('../../../lib/utils');
var {
  Users,
  Batch,
  ApplicationStatus,
  Details,
  Address,
  PhoneNumbers,
  UserAcademicRecords,
  Academics,
  ExamYears,
  UploadedDocument,
} = require('../../../models');

module.exports = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ otp }, { email }],
      },
    });
    if (user) {
      const batch = await Batch.findOne({ where: { isAdmissionOpen: true } });
      user.otp = null;
      user.isVerified = true;
      user.batchId = batch.id;

      await ApplicationStatus.create({ appId: user.appId });
      await Details.create({ appId: user.appId });
      await Address.create({ appId: user.appId });
      await PhoneNumbers.create({ appId: user.appId });
      await UploadedDocument.create({ appId: user.appId });

      const [
        firstYear,
        secondYear,
        thirdYear,
        finalYear,
        gat,
        ms,
      ] = await ExamYears.findAll();

      const [
        firstYearAcademics,
        secondYearAcademics,
        thirdYearAcademics,
        finalYearAcademics,
        gatAcademics,
        msAcademics,
      ] = await Academics.bulkCreate([{}, {}, {}, {}, {}, {}], { returning: true });

      await UserAcademicRecords.bulkCreate([
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
