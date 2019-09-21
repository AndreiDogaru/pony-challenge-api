const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Initialize Express

require('./lib/db'); // Initialize DB connection pool

app.use(logger('dev')); // API logs

app.use(cors()); // Cross-origin resource sharing

// Application settings
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes')); // Import routes

module.exports = app;
