const  { getHealth } = require('../../services/healthService')
const { expectHealthResponse } = require('../../expectations/healthExpectations')

describe('Health Check', () => {
    it('should return a healthy API response', () => {
        getHealth().then((response) => {
            expectHealthResponse(response)
        })
    })
})