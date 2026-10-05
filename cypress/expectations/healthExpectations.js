function expectHealthResponse(response) {
    expect(response.status).to.be.equal(200)
    expect(response.body.status).to.be.equal('ok')
    expect(response.body).to.have.property('timestamp')
    expect(new Date(response.body.timestamp).toString()).not.to.equal('Invalid Date')
}

module.exports = {
    expectHealthResponse
}