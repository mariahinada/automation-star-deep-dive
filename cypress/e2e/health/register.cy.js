const { postRegister } = require('../../services/registerService')
const { expectRegisterResponse } = require('../../expectations/registerExpectations')

describe('Register Check', () => {
    it('Should creante an valid user', () => {
        postRegister().then((response) => {
            expectRegisterResponse(response)
        })
    })
})