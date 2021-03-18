/* eslint-disable no-undef */
var chaiHttp = require('chai-http');
var chai = require('chai');
var app = require('../../../../index');

var { expect } = chai;
// var should = chai.should();

chai.use(chaiHttp);

describe('/api/user/login', function describing() {
  it('GET request should give error', function testing() {
    chai
      .request(app)
      .get('/api/user/login')
      .end(function response(err, res) {
        expect(res).to.have.status(404);
      });
  });
  it('POST request without body should give error', function testingWithoutBody() {
    chai
      .request(app)
      .post('/api/user/login')
      .end(function response(err, res) {
        expect(res.status).to.be.equal(500);
      });
  });
  it('POST Request should be successfull with correct credentials', function expectWorking() {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ emailOrCnic: 'ikrmaahmad47@gmail.com', password: 'ikrma' })
      .end(function response(err, res) {
        expect(res.status).to.be.equal(200);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.data[0]).to.have.property('email');
        expect(res.body.data[0]).to.have.property('token');
        expect(res.body.data[0]).to.have.property('isAdmin');
        expect(res.body.data[0]).to.have.property('isVerified');
      });
  });
});
