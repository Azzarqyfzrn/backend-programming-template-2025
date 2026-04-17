const { Draw, Prize } = require('../../../models');

async function getAttempts(userId, date) {
  return Draw.find({ userId, date });
}

async function createAttempt(data) {
  return Draw.create(data);
}

async function getAvailablePrize() {
  return Prize.findOne({
    $expr: { $lt: ['$winners', '$quota'] },
  });
}

async function incrementWinner(prizeId) {
  return Prize.updateOne({ _id: prizeId }, { $inc: { winners: 1 } });
}

module.exports = {
  getAttempts,
  createAttempt,
  getAvailablePrize,
  incrementWinner,
};
