const { Draw, Prize, Users } = require('../../../models');

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

async function getAvailablePrizes() {
  return Prize.find({
    $expr: { $lt: ['$winners', '$quota'] },
  });
}

async function incrementWinner(prizeId) {
  return Prize.updateOne({ _id: prizeId }, { $inc: { winners: 1 } });
}

async function getUserHistory(userId) {
  return Draw.find({ userId });
}

async function getWinners() {
  const draws = await Draw.find({ prize: { $ne: null } });

  const result = await Promise.all(
    draws.map(async (draw) => {
      const user = await Users.findOne({ userId: draw.userId });

      return {
        name: user ? user.fullName : 'Unknown User',
        prize: draw.prize,
      };
    })
  );

  return result;
}

async function getAllPrizes() {
  return Prize.find();
}

module.exports = {
  getAttempts,
  getUserHistory,
  createAttempt,
  getAvailablePrize,
  incrementWinner,
  getAvailablePrizes,
  getWinners,
  getAllPrizes,
};
