var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var random = require('random');

function genOTP() {
  return random.int(1000, 9999);
}

function sendOTP({ otp, email, isVerified }) {
  const transporter = nodemailer.createTransport({
    host: 'mail.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
      user: 'ghost.rider3327@gmail.com', // generated ethereal user
      pass: '03472414654', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: "don't reply <ghost.rider3327@gmail.com>", // sender address
    to: `${email}`, // list of receivers
    subject: `${isVerified ? 'OTP to reset password' : 'OTP to verify the email, please login to continue'}`, // Subject line
    // text: `${otp}`, // plain text body
    html: `<h1>${otp}</h1>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    return console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
}

function issueJwt(appId) {
  const expiresIn = '1d';
  const payload = {
    sub: appId,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn });

  return `Bearer ${token}`;
}

function verifyPassword({ passwordFromUser, passwordHashFromDb }) {
  const passwordHashFromUser = crypto
    .createHash('sha256')
    .update(passwordFromUser)
    .digest('hex');
  return passwordHashFromDb === passwordHashFromUser;
}

function passwordHash(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

module.exports.issueJwt = issueJwt;
module.exports.verifyPassword = verifyPassword;
module.exports.passwordHash = passwordHash;
module.exports.sendOTP = sendOTP;
module.exports.genOTP = genOTP;
