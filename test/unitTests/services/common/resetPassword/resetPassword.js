/* eslint-disable no-undef */
var sinon = require('sinon');
var { User } = require('../../../../../models');
var resetPassword = require('../../../../../services/common/resetPassword/resetPassword');
var utils = require('../../../../../lib/utils');

const password = 'hello1234';
const confirmPassword = password;

const dbResponse = {
  save: sinon.stub().resolves(),
};

const serviceResponse = {
  success: true,
  message: 'password updated successfully',
  data: [],
};

const flushPromises = () => new Promise(setImmediate);

describe('Reset Password Service', function describing() {
  it('should Reset Password', async function testingVerifyOTPService() {
    const req = { body: { password, confirmPassword } };
    sinon.stub(utils, 'passwordHash');
    sinon.stub(User, 'findOne').resolves(dbResponse);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await resetPassword(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, serviceResponse);
  });

  afterEach(() => {
    sinon.restore();
  });
});
