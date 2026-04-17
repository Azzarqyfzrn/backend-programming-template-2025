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

module.exports = {
  draw,
};
