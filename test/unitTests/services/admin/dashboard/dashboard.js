/* eslint-disable no-undef */
var sinon = require('sinon');
var { applicationStatus, detail } = require('../../../../../models');
var dashboard = require('../../../../../services/admin/dashboard/dashboard');

const serviceResponse = {
  success: true,
  message: 'fetched successfully!',
  data: [
    { submittedApplicantsDetails: [] },
    { acceptedApplicantsDetails: [] }],
};

describe('GET admin Dashboard Service', function testing() {
  it('should respond with success response', async function tests() {
    sinon.stub(applicationStatus, 'findAll').resolves([]);
    sinon.stub(detail, 'findAll').resolves([]);
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await dashboard(req, res);
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, serviceResponse);
  });
  after(function restoreStubbing() {
    sinon.restore();
  });
});
