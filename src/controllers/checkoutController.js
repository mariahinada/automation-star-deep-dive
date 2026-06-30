const checkoutService = require('../services/checkoutService');

function checkout(req, res) {
  try {
    const order = checkoutService.checkout(req.body);
    res.status(200).json({
      message: 'Checkout completed successfully',
      userId: req.user.id,
      order,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  checkout,
};
