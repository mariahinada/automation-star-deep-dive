const { expect } = require('chai');
const request = require('./httpClient');

describe('Path Coverage - POST /api/register', () => {
  it('should register a new user', async () => {
    const response = await request
      .post('/api/register')
      .send({
        email: 'newuser@example.com',
        password: 'mypassword',
        name: 'New User',
      });

    expect([201, 409]).to.include(response.status);

    if (response.status === 201) {
      expect(response.body).to.have.property('message');
      expect(response.body.user).to.include({
        email: 'newuser@example.com',
        name: 'New User',
      });
    }
  });
});
