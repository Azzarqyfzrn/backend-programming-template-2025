const drawRepository = require('./draw_repository');

async function draw(userId) {
  const today = new Date().toISOString().slice(0, 10);

  const attempts = await drawRepository.getAttempts(userId, today);

  if (attempts.length >= 5) {
    throw new Error('Limit 5x per hari tercapai');
  }

  const prizes = await drawRepository.getAvailablePrizes();

  const result = {
    win: false,
    prize: null,
  };

  const isWin = Math.random() < 0.3;

  if (isWin && prizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    await drawRepository.incrementWinner(prize.id);

    await drawRepository.createAttempt({
      userId,
      date: today,
    });

    result.win = true;
    result.prize = prize.name;
  }

  return result;
}

module.exports = {
  draw,
};
