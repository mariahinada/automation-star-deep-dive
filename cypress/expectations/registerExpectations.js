function expectRegisterResponse(response) {
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.equal('User registered successfully')

}

module.exports = {
    expectRegisterResponse
}