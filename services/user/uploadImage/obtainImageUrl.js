var aws = require('aws-sdk');
var { genOTP: generateRandomNumber } = require('../../../lib/utils');

aws.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

module.exports = (req, res) => {
  const { fileName, fileType } = req.body;
  const hashedFileName = fileName.slice(0, fileName.lastIndexOf('.')) + generateRandomNumber() + generateRandomNumber() + fileName.slice(fileName.lastIndexOf('.'));
  const s3 = new aws.S3();

  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: process.env.Bucket,
    Key: hashedFileName,
    Expires: 60 * 10,
    ContentType: fileType,
    ACL: 'public-read',
  };

  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err, data: [] });
    }
    // eslint-disable-next-line max-len
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${process.env.Bucket}.s3.amazonaws.com/${hashedFileName}`,
    };
    // Send it all back
    res.json({ success: true, message: 'url generated successfully', data: [returnData] });
  });
};
