var { UploadedDocument } = require('../../../models/models');

module.exports = async (req, res) => {
  const { appId } = req.params;
  try {
    const documents = await UploadedDocument.findOne({
      where: { appId },
      attributes: { exclude: ['id', 'appId', 'createdAt', 'updatedAt'] },
    });
    res.status(200).json({ success: true, message: 'fetched successfully', data: [documents] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'server Error', data: [] });
  }
};
