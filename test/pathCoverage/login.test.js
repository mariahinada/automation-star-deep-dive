const { expect } = require('chai');
const request = require('./httpClient');

describe('Path Coverage - POST /api/login', () => {
  it('should authenticate an existing user and return a JWT token', async () => {
    const response = await request
      .post('/api/login')
      .send({
        email: 'alice@example.com',
        password: 'password123',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.user).to.deep.equal({
      id: 1,
      email: 'alice@example.com',
      name: 'Alice Johnson',
    });
  });
});
