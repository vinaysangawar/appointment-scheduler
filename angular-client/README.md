# Appointment Scheduler Angular Frontend

>  Angular frontend that allows a user to select a timeslot and create an appointment. A user can update an existing appointment as well as clear an appointment.

# Getting started

To start the application locally:

- Clone this repo
- `cd angular-client`
- `npm install` to install all required backend dependencies
- `npm install -g bower` if you do not have bower already (may need sudo)
- `bower install` to install all required frontend dependencies
- `npm install -g gulp` if you do not have gulp already (may need sudo)
- `npm install -g http-server` a simple http server (may need sudo)
- `gulp` builds the project to dist/ folder
- `http-server dist` to run the project from dist/

Open http://127.0.0.1:8080 in a web browser.

# Code Overview

## Application Structure

- `app/scripts/app.js` - The entry point of the application. This file defines the angular application and sets angular routes for the SPA
- `app/scripts/controllers.js` - This file contains the angular controller.
- `app/scripts/services.js` - This file contains the angular factories that return an angular $resource that allows for http requests to the server.
- `app/views/` - This folder contains the html views for the application.
