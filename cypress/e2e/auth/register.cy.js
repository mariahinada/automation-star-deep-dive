const { register } = require('../../services/authService')

const {
  expectSuccessfulRegistration,
  expectMissingFieldError,
  expectDuplicateEmailError
} = require('../../expectations/authExpectations')

const { createUniqueUser } = require('../../helpers/userFactory')
describe('Register', () => {
    let registerData
  
    beforeEach(() => {
      cy.fixture('auth/register').then((data) => {
        registerData = data
      })
    })
  
    it('should register a new user successfully', () => {
      const user = createUniqueUser(registerData.validUser)
  
      register(user).then((response) => {
        expectSuccessfulRegistration(response)
      })
    })
  
    it('should not register a user when email is missing', () => {
      register(registerData.missingEmail).then((response) => {
        expectMissingFieldError(response)
      })
    })
  
    it('should not register a user when password is missing', () => {
      register(registerData.missingPassword).then((response) => {
        expectMissingFieldError(response)
      })
    })
  
    it('should not register a user when name is missing', () => {
      register(registerData.missingName).then((response) => {
        expectMissingFieldError(response)
      })
    })
  
    it('should not register a user with an already registered email', () => {
      const user = createUniqueUser(registerData.validUser)
  
      register(user).then((firstResponse) => {
        expectSuccessfulRegistration(firstResponse)
  
        register(user).then((secondResponse) => {
          expectDuplicateEmailError(secondResponse)
        })
      })
    })
  })