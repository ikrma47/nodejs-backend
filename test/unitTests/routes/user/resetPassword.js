/* eslint-disable no-undef */
var chaiHttp = require('chai-http');
var chai = require('chai');
var app = require('../../../../index');

var { expect } = chai;
// var should = chai.should();

chai.use(chaiHttp);

describe('PATCH /api/user/forget-password/reset-password', function describing() {
  it('should be not successfull with incorrect confirm password', function expectWorking() {
    chai
      .request(app)
      .patch('/api/user/forget-password/reset-password')
      .send({
        email: 'test@gmail.com', otp: '1566', password: 'ikrma', confirmPassword: 'ikrma1',
      })
      .end(function response(err, res) {
        expect(res.status).to.be.equal(403);
      });
  });
});
