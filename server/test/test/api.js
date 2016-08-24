var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var winston = require('winston');
var mongoose = require("mongoose");

const url = 'http://localhost:9527';
const username = "test_user";
var uid;

describe('Test Story Chain', function() {

  before(function(done) {
    var con = mongoose.connect('mongodb://localhost/ChainStory');
    mongoose.connection.on('open', function(){
        con.connection.db.dropDatabase(function(err, result){
            done();
        });
    });
  });
  // within before() you can run all the operations that are needed to setup your tests. In this case
  // I want to create a connection with the database, and when I'm done, I call done().

  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('User', function() {
    it('should be able to create user', function(done) {
      var profile = {
        name: username,
        type: 0,
        wx_openid: 'Valerio',
        wb_openid: 'Gheri',
        avator: "avatorurl",
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
      request(url)
    	.post('/user')
    	.send(profile)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
        // end handles the response
    	.end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.uid.should.not.equal(null);
        done();
      });
    });

    it('should able to query user by username', function(done){
    	request(url)
    		.get('/user/name/'+username)
    		.expect('Content-Type', /json/)
    		.expect(200) //Status code
    		.end(function(err,res) {
    			if (err) {
    				throw err;
    			}
    			// Should.js fluent syntax applied
    			res.body.should.have.property('uid');
          uid = res.body.uid;
          res.body.name.should.equal(username);
          res.body.type.should.equal(0);                    
          res.body.create_at.should.not.equal(null);
    			done();
    		});
  	});

    it('should able to query user by id', function(done){
      request(url)
        .get('/user/id/'+uid)
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          // Should.js fluent syntax applied
          res.body.should.have.property('uid');
          res.body.name.should.equal(username);
          res.body.type.should.equal(0);                    
          res.body.create_at.should.not.equal(null);
          done();
        });
    });
  });

  describe('Story', function() {
    var sid;
    it('should be able to create story', function(done) {
      var story = {
        author: { uid: uid },
        title: "Test Story Title",
        content: "story content no less than 20 chars..."
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
      request(url)
      .post('/story')
      .send(story)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
        // end handles the response
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.sid.should.not.equal(null);
        sid = res.body.sid 
        done();
      });
    });

    it('should be able to create story chain', function(done) {
      var story = {
        author: { uid: uid },
        title: "Test Story Title",
        parent_id: sid,
        content: "story content no less than 20 chars..."
      };
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
      request(url)
      .post('/story')
      .send(story)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
        // end handles the response
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.sid.should.not.equal(null);
        done();
      });
    });

    it('should be able to query story by sid', function(done) {
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
      request(url)
      .get('/story/'+sid)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
        // end handles the response
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.sid.should.not.equal(null);
        done();
      });
    });


    it('should be able to delete story by sid', function(done) {
    // once we have specified the info we want to send to the server via POST verb,
    // we need to actually perform the action on the resource, in this case we want to 
    // POST on /api/profiles and we want to send some info
    // We do this using the request object, requiring supertest!
      request(url)
      .delete('/story/id/'+sid)
      .expect('Content-Type', /json/)
      .expect(200) //Status code
        // end handles the response
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
    });

  });

});