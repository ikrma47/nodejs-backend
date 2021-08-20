/* eslint-disable no-undef */
var sinon = require('sinon');
var { UploadedDocument } = require('../../../../../models');
var getDocuments = require('../../../../../services/common/documents/getDocuments');

const flushPromises = () => new Promise(setImmediate);
const expectServiceResponse = {
  success: true,
  message: 'fetched successfully',
  data: [{}],
};

describe('GET Documents SERVICE', function testing() {
  it('should get the departments', async function tests() {
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(UploadedDocument, 'findOne').resolves({});
    await getDocuments(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, expectServiceResponse);
  });
  after(function restoringStubbed() {
    sinon.restore();
  });
});
