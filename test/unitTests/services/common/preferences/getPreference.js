/* eslint-disable no-undef */
var sinon = require('sinon');
var { coursePreference } = require('../../../../../models');
var getPreference = require('../../../../../services/common/preferences/getPreference');

const serviceResponse = {
  success: true,
  message: "you haven't applied yet",
  data: [],
};

const flushPromises = () => new Promise(setImmediate);

describe('GET Preference Service', function describing() {
  it('should get preferences', async function testinggetPreferenceService() {
    const req = { params: {} };
    sinon.stub(coursePreference, 'findAll').resolves([]);
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getPreference(req, res);
    await flushPromises();
    sinon.assert.calledWithExactly(res.status, 200);
    sinon.assert.calledWith(res.json, serviceResponse);
  });

  afterEach(() => {
    sinon.restore();
  });
});
