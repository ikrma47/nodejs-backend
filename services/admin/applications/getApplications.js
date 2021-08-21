var { Op } = require('sequelize');
var { sequelize } = require('../../../models');

var {
  User,
  detail,
  course,
  experience,
  department,
  coursePreference,
  departmentCourse,
  applicationStatus,
  offeredProgram,
} = require('../../../models');

const maximumNumber = 99999999;
const smallestNumber = 0;
const anyString = '%';

function getApplications({
  appId = anyString,
  appIdGreaterThan = smallestNumber,
  appIdSmallerThan = maximumNumber,
  name = anyString,
  cnic = anyString,
  domicile = anyString,
  courseCategory = anyString,
  departmentName = anyString,
  courseName = anyString,
  isAccepted = true,
} = {}) {
  try {
    return detail.findAll({
      attributes: ['appId', 'name', 'image', 'courseCategory'],
      where: {
        name: { [Op.like]: name == '%' ? name : `%${name}%` },
        domicile: { [Op.like]: domicile },
        courseCategory: { [Op.like]: courseCategory },
      },
      include: [
        {
          model: User,
          attributes: ['appId', 'cnic'],
          where: {
            isAdmin: false,
            cnic: { [Op.like]: cnic == '%' ? cnic : `%${cnic}%` },
            [Op.or]: [
              { appId: { [Op.between]: [appIdGreaterThan, appIdSmallerThan] } },
              sequelize.where(
                sequelize.cast(sequelize.col('User.appId'), 'varchar'),
                { [Op.iLike]: appId == '%' ? appId : `%${appId}%` },
              ),
            ],
          },
          required: false,
          include: [
            { model: experience, attributes: [] },
            {
              model: applicationStatus,
              attributes: ['isAccepted', 'isSubmitted'],
              where: { [Op.and]: [{ isSubmitted: true }, { isAccepted }] },
            },
            {
              model: coursePreference,
              attributes: [],
              include: [
                {
                  model: offeredProgram,
                  attributes: [],
                  include: [
                    {
                      model: departmentCourse,
                      attributes: [],
                      include: [
                        {
                          model: department,
                          attributes: [],
                          where: {
                            departmentName: {
                              [Op.like]: departmentName,
                            },
                          },
                        },
                        {
                          model: course,
                          attributes: [],
                          where: {
                            courseName: {
                              [Op.like]: courseName,
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  } catch (error) {
    return error;
  }
}
module.exports = async (req, res) => {
  try {
    const applicants = await getApplications(req.query);
    res.status(200).json({
      success: true,
      message: 'fetched successfully',
      data: [...applicants],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      data: [],
    });
  }
};

module.exports.getApplications = getApplications;
