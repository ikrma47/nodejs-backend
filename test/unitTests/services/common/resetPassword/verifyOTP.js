/* eslint-disable no-undef */
var sinon = require('sinon');
var { Users } = require('../../../../../models');
var verifyOTP = require('../../../../../services/common/resetPassword/verifyOTP');

const dbResponse = {
  email: 'dummy@email.com',
  otp: 1234,
};

const serviceResponse = {
  success: true,
  message: 'OTP is correct',
  data: [{ ...dbResponse }],
};

const flushPromises = () => new Promise(setImmediate);

describe('Verify OTP Service', function describing() {
  it('should verify OTP', async function testingVerifyOTPService() {
    const req = { body: {} };
    sinon.stub(Users, 'findOne').resolves({ ...dbResponse });
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await verifyOTP(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, serviceResponse);
  });

  afterEach(() => {
    sinon.restore();
  });
});
