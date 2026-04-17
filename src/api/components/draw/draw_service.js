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

  const isWin = true;

  if (isWin && prizes.length > 0) {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];
    // eslint-disable-next-line no-underscore-dangle
    await drawRepository.incrementWinner(prize._id.toString());

    result.win = true;
    result.prize = prize.name;
  }

  await drawRepository.createAttempt({
    userId,
    date: today,
    prize: result.prize,
  });

  return result;
}

async function getHistory(userId) {
  const data = await drawRepository.getUserHistory(userId);

  return data.map((item) => ({
    date: item.date,
    prize: item.prize || null,
  }));
}

async function getPrizes() {
  const prizes = await drawRepository.getAllPrizes();

  return prizes.map((p) => ({
    name: p.name,
    quota: p.quota,
    winners: p.winners,
    remaining: p.quota - p.winners,
  }));
}

function maskName(name) {
  const parts = name.split(' ');
  return parts
    .map((p) => p[0] + '*'.repeat(p.length - 2) + p.slice(-1))
    .join(' ');
}

async function getWinnersList() {
  const data = await drawRepository.getWinners();

  return data.map((item) => ({
    name: maskName(item.name || 'User'),
    prize: item.prize,
  }));
}

module.exports = {
  draw,
  getHistory,
  getPrizes,
  maskName,
  getWinnersList,
};
