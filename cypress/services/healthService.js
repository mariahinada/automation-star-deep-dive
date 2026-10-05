function getHealth() {
    return cy.request('GET', '/api/health')
}

module.exports = {
    getHealth
}