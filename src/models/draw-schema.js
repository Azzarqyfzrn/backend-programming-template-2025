module.exports = (db) =>
  db.model(
    'Draw',
    db.Schema({
      userId: Number,
      date: String,
    })
  );
