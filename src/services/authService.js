const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, getNextUserId } = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'ecommerce-secret-key';
const JWT_EXPIRES_IN = '1h';

function findByEmail(email) {
  return users.find((user) => user.email === email);
}

function findById(id) {
  return users.find((user) => user.id === id);
}

function register({ email, password, name }) {
  if (!email || !password || !name) {
    const error = new Error('Email, password, and name are required');
    error.statusCode = 400;
    throw error;
  }

  if (findByEmail(email)) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: getNextUserId(),
    email,
    password: bcrypt.hashSync(password, 10),
    name,
  };

  users.push(user);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
  findById,
};
