var { UploadedDocuments } = require('../../../models/models');

module.exports = async (req, res) => {
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);

  try {
    const documents = await UploadedDocuments.findOne({ where: { appId: req.user.appId } });

    bodyKeys.forEach((key, idx) => { documents[key] = bodyValues[idx]; });
    await documents.save();

    res.status(200).json({ success: true, message: 'update successfully!', data: [documents] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'server error', data: [] });
  }
};
