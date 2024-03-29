/* eslint-disable no-undef */
var sinon = require('sinon');
var { experience } = require('../../../../../models');
var getExperience = require('../../../../../services/common/experience/getExperience');

const flushPromises = () => new Promise(setImmediate);
const expectServiceResponse = {
  success: true,
  message: 'no details found',
  data: [],
};

describe('GET Experiencec SERVICE', function testing() {
  it('should get the experience', async function tests() {
    const req = { params: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(experience, 'findAll').resolves([]);
    await getExperience(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWithExactly(res.json, expectServiceResponse);
  });
});
