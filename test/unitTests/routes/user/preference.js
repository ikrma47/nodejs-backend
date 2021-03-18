/* eslint-disable no-undef */
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../..');

var token = '';
var { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/user/preference:appId', function preferenceApi() {
  before('get JWT', function getJwt(done) {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ emailOrCnic: 'ikrmaahmad47@gmail.com', password: 'ikrma' })
      .end((err, res) => {
        token = res.body.data[0].token.trim();
        expect(res.body.data[0]).to.have.property('token');
        done();
      });
  });
  it('should get the preferences of the user', function getPreference() {
    chai
      .request(app)
      .get('/api/user/preference/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.status).to.be.equals(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('success');
        expect(res.body.data).to.be.a('array');
      });
  });
});
