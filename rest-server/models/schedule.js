const Appointment = require('./Appointment');

const schedule = {
  '9:00am-10:00am': {},
  '10:00am-11:00am': {},
  '11:00am-12:00pm': {},
  '12:00pm-1:00pm': {},
  '1:00pm-2:00pm': {},
  '2:00pm-3:00pm': {},
  '3:00pm-4:00pm': {},
  '4:00pm-5:00pm': {}
};

exports.getSchedule = function getSchedule() {
  return new Promise((resolve, reject) => {
    if (schedule && Object.keys(schedule).length === 8) {
      resolve(schedule);
    } else reject('A proper schedule does not exist');
  });
};

exports.getTimeslot = function getTimeslot(timeslot) {
  return new Promise((resolve, reject) => {
    if (schedule[timeslot]) {
      resolve(schedule[timeslot]);
    } else reject(`Invalid timeslot: ${timeslot}`);
  });
};

exports.updateTimeslot = function updateTimeslot(timeslot, name, phoneNumber) {
  return new Promise((resolve, reject) => {
    if (schedule[timeslot]) {
      try {
        schedule[timeslot] = new Appointment(name, phoneNumber);
        resolve(schedule[timeslot]);
      } catch (err) {
        reject(`Error in updating timeslot: ${err}`);
      }
    } else reject(`Invalid timeslot: ${timeslot}`);
  });
};

exports.clearTimeslot = function clearTimeslot(timeslot) {
  return new Promise((resolve, reject) => {
    if (schedule[timeslot]) {
      try {
        schedule[timeslot] = {};
        resolve(schedule[timeslot]);
      } catch (err) {
        reject(`Error in clearing timeslot: ${err}`);
      }
    } else reject(`Invalid timeslot: ${timeslot}`);
  });
};

// Used for testing
exports.resetSchedule = function resetSchedule() {
  return new Promise((resolve, reject) => {
    try {
      schedule = {
        '9:00am-10:00am': {},
        '10:00am-11:00am': {},
        '11:00am-12:00pm': {},
        '12:00pm-1:00pm': {},
        '1:00pm-2:00pm': {},
        '2:00pm-3:00pm': {},
        '3:00pm-4:00pm': {},
        '4:00pm-5:00pm': {}
      }
      resolve(schedule);
    } catch (err) {
      reject(`Error in resetting schedule: ${err}`);
    }
  });
};
