const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('../config.js');
const user = require('./components/user/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// ROUTER
app.use('/api/user', user);

app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api listening on port', config.api.port);
});