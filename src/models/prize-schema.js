module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      name: String,
      quota: Number,
      winners: {
        type: Number,
        default: 0,
      },
    })
  );
