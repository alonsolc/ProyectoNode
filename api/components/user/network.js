const express = require('express');

//const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/average', average);
router.get('/reportOne', reportOne);
router.get('/:id', get);
router.post('/', insert);
router.put('/:id', update);

// Internal functions
function list(req, res) {
    Controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

function average(req, res) {
    Controller.average()
        .then((average) => {
            response.success(req, res, average, 200);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

function reportOne(req, res) {
    Controller.reportOne()
        .then((reportOne) => {
            response.success(req, res, reportOne, 200);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

function get(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

function insert(req, res) {
    Controller.insert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

function update(req, res) {
    Controller.update(req.body, req.params.id)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((error) => {
            response.error(req, res, error, 500);
        });
}

module.exports = router;