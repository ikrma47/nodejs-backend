/* eslint-disable no-undef */
var { expect } = require('chai');
var sinon = require('sinon');
var nodemailer = require('nodemailer');
var utils = require('../../../lib/utils');

describe('Testing lib/utils.js', function testing() {
  it('testing OTP generating function', function test() {
    const otp = utils.genOTP();
    expect(otp).to.be.a('number');
    expect(otp.toString()).to.have.length(4);
  });

  it('testing Hash function', function tests() {
    const hash = utils.passwordHash('hello');
    expect(hash).to.be.a('string');
    expect(hash).to.have.length(64);
  });

  it('testing verify Hash Function', function tests() {
    const result = utils.verifyPassword({
      passwordFromUser: 'hello',
      passwordHashFromDb: utils.passwordHash('hello'),
    });
    expect(result).to.be.equals(true).and.a('Boolean');
  });

  it('should Issue JWT', function tests() {
    const jwt = utils.issueJwt(1);
    expect(jwt).to.be.a('string');
    expect(jwt).to.have.length(154);
  });

  it('should send the email', function test() {
    const fakeTransporter = {
      sendMail: sinon.stub(),
    };
    sinon.stub(nodemailer, 'createTransport').returns(fakeTransporter);
    utils.sendOTP({ otp: 1234, isVerified: false, email: 'test@test.com' });
    sinon.assert.called(nodemailer.createTransport);
    sinon.assert.called(fakeTransporter.sendMail);
  });
});
