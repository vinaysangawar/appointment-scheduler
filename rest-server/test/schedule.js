let Schedule = require('../models/schedule');

//Require the dev-dependencies
let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Schedule', () => {
  // Before each test we reset the data store
  beforeEach(done => {
    Schedule.resetSchedule()
      .then(schedule => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  /*
  * Test the /GET /schedule route
  */
  describe('/GET schedule', () => {
    it('it should GET the schedule', done => {
      chai.request(server).get('/schedule/').end((err, res) => {
        //res.status.should.be(200);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.be.eql({
          '9:00am-10:00am': {},
          '10:00am-11:00am': {},
          '11:00am-12:00pm': {},
          '12:00pm-1:00pm': {},
          '1:00pm-2:00pm': {},
          '2:00pm-3:00pm': {},
          '3:00pm-4:00pm': {},
          '4:00pm-5:00pm': {}
        });
        done();
      });
    });
  });

  /*
  * Test the /PUT /schedule/:timeslot route
  */
  describe('/PUT appointment', () => {
    it('it should PUT an appointment', done => {
      let appt = { name: 'Vinay', phoneNumber: 7701234567 };
      chai
        .request(server)
        .put('/schedule/10:00am-11:00am')
        .send(appt)
        .end((err, res) => {
          //res.status.should.be(200);
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.be.eql({ name: 'Vinay', phoneNumber: 7701234567 });
          done();
        });
    });
  });

  /*
  * Test the /DELETE /schedule/:timeslot route
  */
  describe('/DELETE appointment', () => {
    it('it should DELETE an appointment', done => {
      chai
        .request(server)
        .delete('/schedule/10:00am-11:00am')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.be.eql({});
          done();
        });
    });
  });

});
