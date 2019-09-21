const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Initialize Express

require('./lib/db'); // Initialize DB connection pool

app.use(cors()); // Cross-origin resource sharing

// Application settings
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.get('/', (req, res) => res.status(200).send({ message: 'This is where it all started :)' }));

module.exports = app;
