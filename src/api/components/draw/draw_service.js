const drawRepository = require('./draw_repository');

async function draw(userId) {
  const today = new Date().toISOString().slice(0, 10);

  const attempts = await drawRepository.getAttempts(userId, today);

  if (attempts.length >= 5) {
    throw new Error('Limit 5x per hari tercapai');
  }

  const isWin = Math.random() < 0.3;

  const result = {
    win: false,
    prize: null,
  };

  if (isWin) {
    const prize = await drawRepository.getAvailablePrize();

    if (prize) {
      await drawRepository.incrementWinner(prize.id.toString());
      result.win = true;
      result.prize = prize.name;
    }
  }

  await drawRepository.createAttempt({
    userId,
    date: today,
  });

  return result;
}

module.exports = {
  draw,
};
