/* eslint-disable no-undef */
var sinon = require('sinon');
var { academics, examYear, detail } = require('../../../../../models');
var getAcademics = require('../../../../../services/common/academics/getAcademics');

const flushPromises = () => new Promise(setImmediate);

const serviceResponse = {
  success: true,
  message: 'record fetched successfully',
  data: [],
};

describe('GET academics Serivce', function tests() {
  it('should get the academics', async function getAcademicsTest() {
    sinon.stub(detail, 'findOne').resolves({ courseCategory: 'MS' });
    sinon.stub(examYear, 'findAll').resolves([]);
    const req = { params: { appId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().resolves(),
    };
    await getAcademics(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, serviceResponse);
  });
  after(function restoringStub() {
    sinon.restore();
  });
});
