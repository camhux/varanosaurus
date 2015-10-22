process.env['NODE_ENV'] = 'testing';
process.env['TOKEN_SECRET'] = 'testing';

var request = require('request');
var inviteUrl = 'http://localhost:8080/api/invitations/';
// var authUrl = 'http://localhost:8080/auth';
var db = require('../../server/db/interface');
var tokens = require('../../server/services/tokens');

//really-need lets us easily clear node's cache
//after each test so that we can have a clean
//server instance before the next text
var needRequire = require('really-need');

describe('Invitation router', function() {

  var server;

  beforeEach(function(done) {
    var context = this;

    context.headers = {'Content-Type': 'application/json'};

    server = needRequire('../../server/server', {bustCache: true, keep: false});

    db.init()
      .catch(done.fail.bind(done))

      .then(function() {
        return db.User.bulkCreate(
          [
            {
              accountName: 'redstarter',
              password: 'broioioing',
            },
            {
              accountName: 'sylkal',
              password: '4dmathshapes',
            },
          ]
        );
      })

      .then(function() {
        return db.Household.create({name: 'Bro Palace'});
      })

      .then(function(household) {
        return db.User.findOne({where: {accountName: 'sylkal'}})
          .then(function(user) {
            household.addUser(user);
            user.setHousehold(household);
            context.headers['X-Access-Token'] = tokens.issue(user.id, household.id);
          });
      })

      .then(done);

  }); // beforeEach

  afterEach(function(done) {
    server.close(done);
  });

  it('should allow Gary to invite Michael to the household', function(done) {

    request({
          method: 'POST',
          headers: this.headers,
          url: inviteUrl,
          body: JSON.stringify({
                      toUsername: 'redstarter',
                    }),
    }, function(err, response, body) {

      var parsedBody = JSON.parse(body);

      expect(err).toBeNull();
      expect(response.statusCode).toEqual(201);

      db.User.findOne({where: {accountName: 'redstarter'}})
        .then(function(user) {
          return user.getReceivedInvitations();
        })
        .then(function(invitations) {
          var invitation;

          expect(invitations).toBeTruthy();
          expect(invitations.length).toEqual(1);

          invitation = invitations[0];

          expect(invitation).toBeTruthy();
          expect(invitation.id).toEqual(parsedBody.id);
          done();
        })
        .catch(done.fail.bind(done));
    });

  }); // 'should allow Gary to invite Michael to the household'




}); // 'Invitation router'
