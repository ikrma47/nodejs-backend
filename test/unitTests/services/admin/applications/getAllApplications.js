/* eslint-disable no-undef */
var sinon = require('sinon');
// var { Users } = require('../../../../../models');
var getAllApplications = require('../../../../../services/admin/applications/getAllApplications');

describe('GET all applicants SERVICE', function testing() {
  it('should get all applicants', async function tests() {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllApplications(req, res);
    sinon.assert.calledWith(res.status, 200);
  });
});
