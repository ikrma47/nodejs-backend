/* eslint-disable no-undef */
const { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

var jwt = '';
chai.use(chaiHttp);

describe('GET /api/user/dashboard/:appId', function describing() {
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
  it('should pass the test', function testingWithoutJWT() {
    chai
      .request(app)
      .get('/api/user/dashboard/1')
      .set('Authorization', jwt)
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data[0]).to.have.property('appId');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('image');
        expect(res.body.data[0]).to.have.property('courseCategory');
      });
  });
});
