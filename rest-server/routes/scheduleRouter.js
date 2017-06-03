const express = require('express');
const bodyParser = require('body-parser');

const Schedule = require('../models/schedule');

const scheduleRouter = express.Router();
scheduleRouter.use(bodyParser.json());

scheduleRouter
  .route('/')
  .get((req, res, next) => {
    Schedule.getSchedule()
      .then((schedule) => {
        res.json(schedule);
      })
      .catch((err) => { next(err); });
  });

scheduleRouter
  .route('/:timeslot')
  .get((req, res, next) => {
    Schedule.getTimeslot(req.params.timeslot)
      .then((timeslot) => {
        res.json(timeslot);
      })
      .catch((err) => { next(err); });
  })
  .put((req, res, next) => {
    Schedule.updateTimeslot(req.params.timeslot, req.body.name, req.body.phoneNumber)
      .then((timeslot) => {
        res.status(201).json(timeslot);
      })
      .catch((err) => { next(err); });
  })
  .delete((req, res, next) => {
    Schedule.clearTimeslot(req.params.timeslot)
      .then((timeslot) => {
        res.json(timeslot);
      })
      .catch((err) => { next(err); });
  });

module.exports = scheduleRouter;
