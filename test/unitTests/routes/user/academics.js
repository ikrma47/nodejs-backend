/* eslint-disable no-undef */
var { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

chai.use(chaiHttp);

describe('POST /api/user/academics', function describing() {
  it('should fail the test due to missing JWT', function testingWithoutJWT() {
    chai
      .request(app)
      .post('/api/user/academics')
      .send({})
      .end(function response(err, res) {
        expect(res).to.have.status(401);
      });
  });
});
