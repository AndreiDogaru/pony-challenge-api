const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // initialize Express

app.use(morgan()); // API Logger

app.use(cors()); // Cross-origin resource sharing

// Application settings
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.get('/', (req, res) => res.status(200).send({ message: 'This is where it all started :)' }));

module.exports = app;