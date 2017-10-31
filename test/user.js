/* eslint-disable */

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Users = require('../models/user');
const server= require('../server');
const should = chai.should();
const expect = chai.expect

chai.use(chaiHttp);
const chaiReq = chai.request(server)

describe('Users', () => {
  beforeEach((done) => {
    Users.remove({}, err => {
      done();
    });
  });
  describe('USERS', () => {
    it('Should get users', (done) => {
      chaiReq
        .get('/users/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        })
    });
    it('Should restrict to only logged in users', (done) => {
      chaiReq
        .get('/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.an('object').with.property('err')
          done();
        })
    });
    it('Should create a new user', (done) => {
      chaiReq
        .post('/users')
        .send({'username': 'Ekonash', 'email_address': 'ashinzekene@gmail.com', 'password': 'ekonash' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object').with.property('username');
          done();
        })
    })
    it('Should get a user already created', (done) => {
      let id;
      chaiReq
        .post('/users')
        .send({'username': 'Ekonash', 'email_address': 'ashinzekene@gmail.com', 'password': 'ekonash' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object').with.property('username');
          console.log(res.body._id)
          id = res.body._id
          chaiReq
            .get('/users')
            .set({'Authorization': res.body._id})
            .end((err, res) => {
              // console.log(res.body)
              expect(res.status).to.equal(200);
              expect(res.body).to.be.an('object').with.property('username');
              done()
            })
        })
      
    })
  })
})