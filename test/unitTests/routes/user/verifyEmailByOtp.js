/* eslint-disable no-undef */
var chaiHttp = require('chai-http');
var chai = require('chai');
var app = require('../../../../index');

var { expect } = chai;
// var should = chai.should();

chai.use(chaiHttp);

describe('PATCH /api/user/verify-email', function describing() {
  it('should not be successfull with invalid otp', function expectWorking() {
    chai
      .request(app)
      .patch('/api/user/verify-email/otp')
      .send({ email: 'test@gmail.com', otp: '1234' })
      .end(function response(err, res) {
        expect(res.status).to.be.equal(403);
      });
  });
});
