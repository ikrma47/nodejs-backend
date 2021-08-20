/* eslint-disable no-undef */
var sinon = require('sinon');
// var faker = require('faker');
var { Users } = require('../../../../../models');
var emailOTP = require('../../../../../services/common/emailOtp/emailOTP');
var utils = require('../../../../../lib/utils');

const flushPromises = () => new Promise(setImmediate);
const email = 'dummy@mail.com';
const otp = 1234;
const isVerified = true;
const dbResponse = {
  save: sinon.stub(),
  email,
  otp,
  isVerified,
};
const expectServiceResponse = {
  success: true,
  message: 'OTP has been sent to your email address',
  data: [{ email }],
};

describe('Email OTP SERVICE', function testing() {
  it('should send the OTP to email', async function tests() {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(utils, 'genOTP');
    sinon.stub(utils, 'sendOTP').onCall({ otp, email, isVerified }).returns();
    sinon.stub(Users, 'findOne').resolves(dbResponse);
    await emailOTP(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, expectServiceResponse);
  });
  after(function restoringStubbed() {
    sinon.restore();
  });
});
