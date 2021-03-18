/* eslint-disable no-undef */
const { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

var jwt = '';
chai.should();
chai.use(chaiHttp);

describe('GET /api/admin/dashboard', function describing() {
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
      .get('/api/admin/dashboard')
      .set('Authorization', jwt)
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        chai.assert.equal(res.body.success, true);
        res.body.data.should.be.a('array');
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('submittedApplicantsDetails');
        expect(res.body.data[1]).to.have.property('acceptedApplicantsDetails');
      });
  });
});
