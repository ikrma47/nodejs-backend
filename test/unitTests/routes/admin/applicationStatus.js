/* eslint-disable no-undef */
const { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

var jwt = '';
chai.should();
chai.use(chaiHttp);

describe('PATCH /api/admin/application-status/:appId', function describing() {
  before('getting JWT', function getJWT(done) {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ emailOrCnic: 'test@test.com', password: '12345' })
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        jwt = res.body.data[0].token.trim();
        done();
      });
  });
  it('/api/admin/dashboard', function testingWithoutJWT() {
    chai
      .request(app)
      .patch('/api/admin/application-status/1')
      .set('Authorization', jwt)
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        chai.assert.equal(res.body.success, true);
        expect(res.body).to.have.property('data');
        res.body.data.should.be.a('array');
      });
  });
});
