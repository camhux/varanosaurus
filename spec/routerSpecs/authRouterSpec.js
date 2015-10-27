process.env['NODE_ENV'] = 'testing';
process.env['TOKEN_SECRET'] = 'boblaw';
var request = require('request');
var authUrl = 'http://localhost:8080/auth/';
var householdUrl = 'http://localhost:8080/api/households/';
var userUrl = 'http://localhost:8080/api/users/';
var db = require('../../server/db/interface');
var tokens = require('../../server/services/tokens');

var needRequire = require('really-need');

describe('authRouter', function() {

  var server;

  beforeEach(function(done) {
    var context = this;
    context.headers = {'content-type': 'application/json'};

    server = needRequire('../../server/server', {bustCache: true, keep: false});
    db.sequelize.sync({force: true})
      .then(function() {

        db.User.create({
          username: 'EmmaMoore',
          password: 'fireandfury',
        })

        .then(function(user) {

          context.headers['x-access-token'] = tokens.issue(user.id);
          var body = JSON.stringify({
            name: 'Chuggie',
          });

          request.post({
            url: householdUrl,
            headers: context.headers,
            body,
          },
          function(error, response, body) {
            done();
          }); //closes post request
          
        })


      }) //closes then after syncing

      .catch(function(error) {
        console.log(error);
        done.fail(error);
      });

  }); //closes beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should create a new user and send back the user, token, and household', function(done) {

    var context = this;
    var body = JSON.stringify({
      username: 'naomijacobs',
      password: 'hypotrochoid',
    });

    request.post({
      url: authUrl + '/signup',
      headers: context.headers,
      body,
    },
    function(error, response, body) {

      var parsedBody = JSON.parse(body);
      context.headers['x-access-token'] = parsedBody.token;

      expect(body).toEqual(jasmine.any(String));
      expect(response.statusCode).toEqual(201);
      expect(parsedBody.user.username).toEqual('naomijacobs');
      expect(parsedBody.token).toBeTruthy();

      request.put({
        url: userUrl + parsedBody.user.id,
        headers: context.headers,
        body: JSON.stringify({householdId: 1,}),
      },
      function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(parsedBody.household).toBeTruthy();
        done();
      })

    });


  }); //closes 'should create a new user'

  it('should login an existing user and send back the user', function(done) {

    var headers = {
      'content-type': 'application/json',
    };
    var body = JSON.stringify({
      username: 'naomi',
      password: 'hypotrochoid',
    });

    request.post({url: authUrl + '/signup', headers, body}, function() {

      var loginBody = JSON.stringify({
        username: 'naomi',
        password: 'hypotrochoid',
      });

      //send without token to simulate login
      request.post({url: authUrl + '/login', headers, body: loginBody}, function(error, response, body) {

        var parsedBody = JSON.parse(body);

        expect(error).toBeFalsy();
        expect(parsedBody.user).toBeTruthy();
        expect(parsedBody.token).toBeTruthy();
        done();

      }); //closes login

    }); //closes signup

  }); //closes 'should login an existing user'

});
