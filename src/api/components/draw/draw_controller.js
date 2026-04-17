const drawService = require('./draw_service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function draw(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'userId is required');
    }

    const result = await drawService.draw(userId);

    return response.status(200).json({
      message: result.win ? 'Selamat kamu menang!' : 'Belum beruntung',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function history(req, res, next) {
  try {
    const { userId } = req.params;

    const result = await drawService.getHistory(userId);

    return res.status(200).json({
      message: 'History retrieved',
      data: result,
    });
  } catch (err) {
    return next(err);
  }
}

async function prizes(req, res, next) {
  try {
    const data = await drawService.getPrizes();

    res.status(200).json({
      message: 'Prize list',
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function winners(req, res, next) {
  try {
    const data = await drawService.getWinnersList();

    res.status(200).json({
      message: 'Winners list',
      data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  draw,
  history,
  prizes,
  winners,
};
