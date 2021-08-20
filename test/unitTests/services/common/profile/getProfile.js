/* eslint-disable no-undef */
var sinon = require('sinon');
var { Users } = require('../../../../../models');
var resetPassword = require('../../../../../services/common/profile/getProfile');

const serviceResponse = {
  success: true,
  message: 'successfully fetched',
  data: [{}],
};

const flushPromises = () => new Promise(setImmediate);

describe('GET Profile Service', function describing() {
  it('should get user profile', async function testingGetProfileService() {
    const req = { params: {} };
    sinon.stub(Users, 'findOne').resolves({});
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
