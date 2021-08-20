/* eslint-disable no-undef */
var sinon = require('sinon');
var { Departments } = require('../../../../../models');
var getDepartments = require('../../../../../services/common/department/getDepartment');

const flushPromises = () => new Promise(setImmediate);

describe('GET department SERIVCE', function testing() {
  it('should respond with status 200', async function tests() {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(Departments, 'findAll').resolves([]);
    await getDepartments(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
  });
  after(function restoringStubbed() {
    sinon.restore();
  });
});
