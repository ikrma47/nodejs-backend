/* eslint-disable no-undef */
const { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

var jwt = '';
chai.should();
chai.use(chaiHttp);

describe('GET /api/user/document/:appId', function describing() {
  before('getting JWT', function getJWT(done) {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ emailOrCnic: 'ikrmaahmad47@gmail.com', password: 'ikrma' })
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        jwt = res.body.data[0].token.trim();
        done();
      });
  });
  it('should get the documents', function testingWithoutJWT() {
    chai
      .request(app)
      .get('/api/user/document/1')
      .set('Authorization', jwt)
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        chai.assert.equal(res.body.success, true);
        res.body.data[0].should.have.property('cnicFront');
        res.body.data[0].should.have.property('cnicBack');
        res.body.data[0].should.have.property('matricCertificate');
        res.body.data[0].should.have.property('intermediateCertificate');
        res.body.data[0].should.have.property('firstSemesterDmc');
        res.body.data[0].should.have.property('secondSemesterDmc');
        res.body.data[0].should.have.property('thirdSemesterDmc');
        res.body.data[0].should.have.property('fourthSemesterDmc');
        res.body.data[0].should.have.property('fifthSemesterDmc');
        res.body.data[0].should.have.property('sixthSemesterDmc');
        res.body.data[0].should.have.property('seventhSemesterDmc');
        res.body.data[0].should.have.property('eighthSemesterDmc');
        res.body.data[0].should.have.property('bsCertificate');
      });
  });
});
