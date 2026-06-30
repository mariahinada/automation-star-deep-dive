const request = require('supertest');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

module.exports = request(BASE_URL);
