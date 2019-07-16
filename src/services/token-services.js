const TokenService = {
    saveAuthToken(authToken){
        window.sessionStorage.setItem('authToken', authToken)
    }
}

module.exports= TokenService