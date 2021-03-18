/* eslint-disable no-undef */
var sinon = require('sinon');
var { ApplicationStatus } = require('../../../../../models/models');
var updateApplicationStatus = require('../../../../../services/admin/applicationStatus/updateApplicationStatus');

const serviceResponse = {
  success: true,
  message: 'Application status fetched successfully',
  data: [{}],
};

describe('UPDATE Application Status Service', function testing() {
  it('should respond with success response', async function tests() {
    sinon.stub(ApplicationStatus, 'update').resolves({});
    sinon.stub(ApplicationStatus, 'findOne').resolves({});
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await updateApplicationStatus(req, res);
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, serviceResponse);
  });
  after(function restoreStubbing() {
    sinon.restore();
  });
});
