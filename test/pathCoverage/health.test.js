const { expect } = require('chai');
const request = require('./httpClient');

describe('Path Coverage - GET /api/health', () => {
  it('should return API health status', async () => {
    const response = await request.get('/api/health');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status', 'ok');
    expect(response.body).to.have.property('timestamp');
  });
});
