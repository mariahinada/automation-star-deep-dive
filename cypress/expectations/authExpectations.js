function expectSuccessfulRegistration(response) {
    expect(response.status).to.equal(201)
    expect(response.body.message).to.equal('User registered successfully')
    expect(response.body).to.have.property('user')
  
    expect(response.body.user).to.have.property('id')
    expect(response.body.user).to.have.property('email')
    expect(response.body.user).to.have.property('name')
  }
  
  function expectMissingFieldError(response) {
    expect(response.status).to.equal(400)
    expect(response.body.error).to.equal(
      'Email, password, and name are required'
    )
  }
  
  function expectDuplicateEmailError(response) {
    expect(response.status).to.equal(409)
    expect(response.body.error).to.equal('Email already registered')
  }
  
  module.exports = {
    expectSuccessfulRegistration,
    expectMissingFieldError,
    expectDuplicateEmailError
  }