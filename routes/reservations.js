const express = require('express');
const reservationsController = require('../controllers/ReservationsController');
const reservations = express.Router();

reservations.post('/', reservationsController.save);

module.exports = {
    reservations
}