const express = require('express');
const drawController = require('./draw_controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/draw', route);

  route.post('/', drawController.draw);
};
