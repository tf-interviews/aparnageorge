let app = require('../app');
const express = require('express');
const router = express.Router();
let mongoose = require("mongoose");
let Note = require('../models/Note');

//Require the packages chai and chaiHttp for testing
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();


chai.use(chaiHttp);
describe('Notes', () => {
   

//Test the /GET route
describe('/GET note', () => {
    // Test the /GET route - get all active notes for a user
    it('it should GET all the active notes for a user', (done) => {
        testuser = "apgeorge"
        chai.request(app)
            .get('/api/notes/'+testuser)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });

    // Test the /GET route- get all archived notes for a user
    it('it should GET all the archived notes for a user', (done) => {
        testuser = "apgeorge"
        chai.request(app)
            .get('/api/notes/archived/'+testuser)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.not.be.eql(0);
              done();
            });
      });

    //Test the /GET route- get a single note by id
    it('it should GET a single note by id', (done) => {
        var testid = "629f6bac8b23b0a21b876899"
        chai.request(app)
            .get('/api/notes/id/'+testid)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body._id.should.be.eql(testid);
              done();
            });
      });

    //Test the /GET route - it should get notes by its tag
    it('it should get notes by its tag', (done) => {
        var testtag = "trial";
        testuser = "apgeorge"
        chai.request(app)
            .get('/api/notes/tags/:author/:tag')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    
                done();
      });
});
  });





//Test the /POST route
describe('/POST note', () => {
  
  //Test the /POST route - it should not save a note without title field
  it('it should not save a note without title field', (done) => {
      let note = {
          
          author: "apgeorge",
          description: "Test Note"
      }
    chai.request(app)
        .post('/api/notes/')
        .send(note)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error').eql('Unable to add this note');
          done();
        });
  });
  
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


//Test the /PUT route
describe('/PUT note', () => {
  
  //Test the /PUT route - it should update a selected note
  it('it should update a selected note ', (done) => {

    let note = {
      
        author: "apgeorge",
        tags: ["test","trial1"]
    }
    let testid = "629f6b7b8b23b0a21b876896"
    chai.request(app)
        .put('/api/notes/update/'+testid)
        .send(note)
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('Note Updated successfully');
                
            done();
      });
});

  //Test the /PUT route - it should Archive a selected note
  it('it should archive a selected note ', (done) => {

    let testid = "629f6b7b8b23b0a21b876896"
    chai.request(app)
        .put('/api/notes/archive/'+testid)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('msg').eql('Note Archived successfully');
            
        done();
    });
});

  //Test the /PUT route - it should archive multiple notes
  it('it should archive multiple notes', (done) => {

    let testids = ["629f6b7b8b23b0a21b876896","629f6bac8b23b0a21b876899"]
    chai.request(app)
        .put('/api/notes/multiarchive/')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Notes Archived successfully');
                
            done();
      });
  });
  
  //Test the /PUT route - it should Unrchive a selected note
  it('it should unarchive a selected note ', (done) => {

    let testid = "629f6b7b8b23b0a21b876896"
    chai.request(app)
        .put('/api/notes/unarchive/'+testid)
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Note Unarchived successfully');
                
            done();
      });
  });

  //Test the /PUT route - it should unarchive multiple notes
  it('it should unarchive multiple notes', (done) => {

    let testids = ["629f6b7b8b23b0a21b876896","629f6bac8b23b0a21b876899"]
    chai.request(app)
        .put('/api/notes/multiunarchive/')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Notes Unarchived successfully');
                
            done();
      });
  });
});

//Test the /DELETE route
describe('/DELETE note', () => {
  
  //Test the /DELETE route - it should delete a note by its id
  it('it should delete a note by its id', (done) => {
    var testid  = "629fad47e9c7fd33dfff69cd";
    chai.request(app)
      .delete('/api/notes/'+testid)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('msg').eql('Note deleted successfully');
            
        done();
      });
  });
  
  //Test the /DELETE route - it should delete notes by their tag
  it('it should delete notes by their tag ', (done) => {
    var testtag = "trial1";
    testuser = "apgeorge"
    chai.request(app)
      .delete('/api/notes/tags/:author/:tag')
      .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Notes deleted successfully');
            
        done();
      });
});

});
});
