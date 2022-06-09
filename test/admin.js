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
describe('Notes', () => {
   

//Test the /GET route
describe('/GET note', () => {
    // Test the /GET route - Get all the active notes for a user
    it('it should Get all the active notes for a user', (done) => {
        chai.request(app)
            .get('/api/admin/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });
    // Test the /GET route - Get all users
    it('it should GET all the active notes for a user', (done) => {
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
describe('/POST note', () => {
  
  //Test the /POST route - it should save a note with all required attributes
  it('it should save a note with all required attributes ', (done) => {
    let note = {
        title: "Test Note",
        author: "apgeorge",
        tags: ["test","trial"],
        description: "Test Note for Trial"
    }
  chai.request(app)
      .post('/api/notes/')
      .send(note)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Note added successfully');
            
        done();
      });
});

});

//Test the /DELETE route
describe('/DELETE note', () => {
  
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
