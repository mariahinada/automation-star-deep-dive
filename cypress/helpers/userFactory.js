function createUniqueUser() {
    const uniqueId = Date.now() 

    return {
        name: `Test User ${uniqueId}`,
        email: `testuser ${uniqueId}`,
        password: 'mypassword'
    }
}

module.exports = {
    createUniqueUser
}