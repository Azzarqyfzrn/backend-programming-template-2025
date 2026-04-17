const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const draw = require('./components/draw/draw_route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  draw(app);

  return app;
};
