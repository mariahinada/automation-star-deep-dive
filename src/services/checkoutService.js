const { products } = require('../models/store');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

function checkout({ items, paymentMethod }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Items array is required and must not be empty');
    error.statusCode = 400;
    throw error;
  }

  if (!paymentMethod) {
    const error = new Error('Payment method is required');
    error.statusCode = 400;
    throw error;
  }

  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error('Payment method must be cash or credit_card');
    error.statusCode = 400;
    throw error;
  }

  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      const error = new Error(`Product with id ${item.productId} not found`);
      error.statusCode = 404;
      throw error;
    }

    const quantity = item.quantity || 1;

    if (quantity < 1) {
      const error = new Error('Quantity must be at least 1');
      error.statusCode = 400;
      throw error;
    }

    if (product.stock < quantity) {
      const error = new Error(`Insufficient stock for product: ${product.name}`);
      error.statusCode = 400;
      throw error;
    }

    const lineTotal = product.price * quantity;
    subtotal += lineTotal;

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      lineTotal,
    });

    product.stock -= quantity;
  }

  const discount = paymentMethod === 'cash' ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  return {
    items: orderItems,
    paymentMethod,
    subtotal: roundCurrency(subtotal),
    discount: roundCurrency(discount),
    total: roundCurrency(total),
  };
}

function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

module.exports = {
  checkout,
};
