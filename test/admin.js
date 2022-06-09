let app = require('../app');
const express = require('express');
const router = express.Router();
let mongoose = require("mongoose");
let Note = require('../models/User');

//Require the packages chai and chaiHttp for testing
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();


chai.use(chaiHttp);
describe('Admin', () => {
   

//Test the /GET route
describe('/GET route', () => {
    // Test the /GET route - Get all notes
    it('it should Get all notes', (done) => {
        chai.request(app)
            .get('/api/admin/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });

    // Test the /GET route - Get all archived notes
    it('it should Get all archived notes', (done) => {
        chai.request(app)
            .get('/api/admin/archived')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });

    // Test the /GET route - Get all active(not archived) notes
    it('it should Get all active notes', (done) => {
        chai.request(app)
            .get('/api/admin/active')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });

    // Test the /GET route - Get all users
    it('it should GET all users', (done) => {
        chai.request(app)
            .get('/api/admin/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });
});





//Test the /POST route
describe('/POST route', () => {
  
  //Test the /POST route - it should save a user with all required attributes
  it('it should save a user with all required attributes ', (done) => {
    let user = {
        name: "Trial User2",
        userid: "trialuser2"
    }
  chai.request(app)
      .post('/api/admin/users')
      .send(user)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('User added successfully');
            
        done();
      });
});

});

//Test the /DELETE route
describe('/DELETE route', () => {
  
  //Test the /DELETE route - it should delete a user by id
  it('it should delete a user by id', (done) => {
    var testid  = "62a13930b2f83412e6a692d1";
    chai.request(app)
      .delete('/api/admin/users/'+testid)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('msg').eql('User deleted successfully');
            
        done();
      });
  });
 

});
});
