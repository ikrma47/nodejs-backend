/* eslint-disable no-undef */
var sinon = require('sinon');
var { ApplicationStatus } = require('../../../../../models/models');
var getApplicationStatus = require('../../../../../services/common/applicationStatus/getApplicationStatus');

const flushPromises = () => new Promise(setImmediate);
const serivceResponse = {
  success: true,
  message: 'Application status fetched successfully',
  data: [{}],
};

describe('GET Application status SERVICE', function testing() {
  it('should return desired result', async function tests() {
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(ApplicationStatus, 'findOne').resolves({});
    await getApplicationStatus(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, serivceResponse);
  });
  after(function restoringStubbed() {
    sinon.restore();
  });
});
