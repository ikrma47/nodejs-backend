/* eslint-disable no-undef */
var sinon = require('sinon');
var utils = require('../../../../../lib/utils');
var { User } = require('../../../../../models');
var login = require('../../../../../services/common/login/login');

const dbRespone = {
  isVerified: true,
  password: 'dummy hash',
  isAdmin: false,
  appId: 'someAppId',
  email: 'something',
};
const successResponse = {
  success: true,
  message: 'logged in successfullys',
  data: [
    {
      token: 'something',
      isAdmin: false,
      appId: 'someAppId',
      email: 'something',
      isVerified: true,
    },
  ],
};

const flushPromises = () => new Promise(setImmediate);

describe('Login Service', function describing() {
  it('should returns correct credentials', async function testingLoginService() {
    const req = { body: { emailOrCnic: 'abccc', password: 'dummy password' } };
    sinon.stub(User, 'findOne').resolves(dbRespone);
    sinon.stub(utils, 'verifyPassword').returns(true);
    sinon.stub(utils, 'issueJwt').returns('something');
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await login(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, successResponse);
  });

  afterEach(() => {
    sinon.restore();
  });
});
