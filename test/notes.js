let app = require('../app');
const express = require('express');
const router = express.Router();
let mongoose = require("mongoose");
let Note = require('../models/Note');

//Require the packages chai and chaiHttp for testing
let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();
let testuser = "apgeorge"


chai.use(chaiHttp);
describe('Notes', () => {
    let testnote; 
    before((done) => {
      testnote = Note.create({
         title: "Test note here", 
         description: "This is a test note specific to this module",  
         author: "apgeorge",
        tags:["tagtest"]})
         .then(() => done()) 
    });

//Test the /GET route
describe('/GET note', () => {
    // Test the /GET route - get all active notes for a user
    it('it should GET all the active notes for a user', (done) => {
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
        var testid = "62a17ba27caba1266c3b8a8e";
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
        title: "Just another note",
        author: "scooper",
        tags: ["demo","trial"],
        description: "Just another Note for Testing"
    }
  chai.request(app)
      .post('/api/notes/')
      .send(note)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(note.title);
            testnote = res.body;
            
        done();
      });
});

});


//Test the /PUT route
describe('/PUT note', () => {
  
  //Test the /PUT route - it should update a selected note
  it('it should update a selected note ', (done) => {

    let note = {
        description: "Voila!"
    }
    let testid = "62a1a69e5daafd9c1f01c5e3";
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

    let testid = "62a182bf3f9b09a423eee9c4"
    chai.request(app)
        .put('/api/notes/archive/'+testid)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('msg').eql('Note Archived successfully');
            
        done();
    });
});
    //Test the /PUT route - it should Unrchive a selected note
    it('it should unarchive a selected note ', (done) => {

        let testid = "62a182bf3f9b09a423eee9c4"
        chai.request(app)
            .put('/api/notes/unarchive/'+testid)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('msg').eql('Note Unarchived successfully');
                    
                done();
        });
    });

  //Test the /PUT route - it should archive multiple notes
  it('it should archive multiple notes', (done) => {

    let testids = ["62a182bf3f9b09a423eee9c4"]
    chai.request(app)
        .put('/api/notes/multiarchive/')
        .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('msg').eql('Notes Archived successfully');
                
            done();
      });
  });
  
  

  //Test the /PUT route - it should unarchive multiple notes
  it('it should unarchive multiple notes', (done) => {

    let testids = ["62a182bf3f9b09a423eee9c4"]
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
    var testid  = testnote._id;
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
    var testtag = "tagtest";
    var testauthor = "apgeorge";
    chai.request(app)
      .delete('/api/notes/tags/'+testauthor+'/'+testtag)
      .end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Notes deleted successfully');
            
        done();
      });
});

});
});
