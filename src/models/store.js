const bcrypt = require('bcryptjs');
const User = require('./User');
const Product = require('./Product');

const users = [
  new User({
    id: 1,
    email: 'alice@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Alice Johnson',
  }),
  new User({
    id: 2,
    email: 'bob@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Bob Smith',
  }),
  new User({
    id: 3,
    email: 'carol@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Carol Williams',
  }),
];

const products = [
  new Product({ id: 1, name: 'Wireless Headphones', price: 79.99, stock: 50 }),
  new Product({ id: 2, name: 'USB-C Hub', price: 34.99, stock: 100 }),
  new Product({ id: 3, name: 'Mechanical Keyboard', price: 129.99, stock: 30 }),
];

let nextUserId = 4;

module.exports = {
  users,
  products,
  getNextUserId: () => nextUserId++,
};
