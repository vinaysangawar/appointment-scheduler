# Node/Express Scheduling Server

>  Node (Express) REST API to perform CRUD operations on timeslot data to keep track of appointments for a scheduling application.

# Getting started

To get the Node server running locally:

- Clone this repo
- `cd rest-server`
- `npm install` to install all required dependencies
- `npm start` to start the local server

The server will run on localhost:3000

# Code Overview

## Application Structure

- `app.js` - The entry point of the application. This file defines the express server and requires the routes and middleware used in the application.
- `routes/` - This folder contains the route definitions for the API.
- `models/` - This folder contains the model definition and provides an in memory object store for the schedule.

## Routes

`Operation`: GET <br>
`Endpoint`: host:port/schedule <br>
`Response`: Current state of the full schedule

`Operation`: GET <br>
`Endpoint`: host:port/schedule/timeslot <br>
`Response`: An appointment for a specific timeslot. Returns and empty object if there is no appointment.

`Operation`: PUT <br>
`Endpoint`: host:port/schedule/timeslot <br>
`Body`: { "name": "Vinay", "phoneNumber": 7701234567} <br>
`Response`: Appointment Details

`Operation`: DELETE <br>
`Endpoint`: host:port/schedule/timeslot <br>
`Response`: Empty object
