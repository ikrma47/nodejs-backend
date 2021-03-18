/* eslint-disable no-undef */
var chaiHttp = require('chai-http');
var chai = require('chai');
var app = require('../../../../index');

var { expect } = chai;
// var should = chai.should();

chai.use(chaiHttp);

describe('POST /api/user/signup', function describing() {
  it('should be successfull with correct credentials', function expectWork() {
    chai
      .request(app)
      .post('/api/user/signup')
      .send({ email: 'test@gmail.com', cnic: '1234567890987', password: 'ikrma' })
      .end(function response(err, res) {
        expect(res.status).to.be.equal(403);
        expect(res.body.success).to.be.equal(false);
      });
  });
});
