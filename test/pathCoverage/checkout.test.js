const { expect } = require('chai');
const request = require('./httpClient');

describe('Path Coverage - POST /api/checkout', () => {
  let authToken;

  before(async () => {
    const loginResponse = await request
      .post('/api/login')
      .send({
        email: 'alice@example.com',
        password: 'password123',
      });

    authToken = loginResponse.body.token;
  });

  it('should complete checkout with cash payment', async () => {
    const response = await request
      .post('/api/checkout')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
        paymentMethod: 'cash',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Checkout completed successfully');
    expect(response.body).to.have.property('userId', 1);
    expect(response.body.order).to.have.property('paymentMethod', 'cash');
    expect(response.body.order).to.have.property('items').that.is.an('array').with.lengthOf(2);
    expect(response.body.order).to.have.property('discount').that.is.above(0);
  });
});
