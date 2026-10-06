function postRegister() {
    return cy.request('POST', '/api/register')
}

module.exports = {}