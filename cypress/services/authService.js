function register(user) {
    return cy.request({
        method: 'POST',
        url: '/api/register',
        body: user,
        failOnStatusCode: false
    })
}

module.exports = {
    register
}