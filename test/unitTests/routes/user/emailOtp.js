/* eslint-disable no-undef */
const { expect } = require('chai');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../../../../index');

// var jwt = '';
chai.should();
chai.use(chaiHttp);

describe('PATCH /api/user/email-otp', function describing() {
  before('getting JWT', function getJWT(done) {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ emailOrCnic: 'ikrmaahmad47@gmail.com', password: 'ikrma' })
      .end(function response(err, res) {
        expect(res).to.have.status(200);
        // jwt = res.body.data[0].token.trim();
        done();
      });
  });
  // it('should pass the test', function testingWithoutJWT() {
  //   chai
  //     .request(app)
  //     .patch('/api/user/email-otp')
  //     .set('Authorization', jwt)
  //     .send({ emailOrCnic: 'ikrmaahmad47@gmail.com' })
  //     .end(function response(err, res) {
  //       expect(res).to.have.status(200);
  //       chai.assert.equal(res.body.success, true);
  //       res.body.should.be.a('object');
  //       expect(res.body.data[0]).to.have.property('email');
  //     });
  // });
});
