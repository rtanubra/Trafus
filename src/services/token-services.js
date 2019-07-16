const TokenService = {
    saveAuthToken(authToken){
        window.sessionStorage.setItem('authToken', authToken)
    },
    deleteAutthToken(){
        window.sessionStorage.removeItem('authToken')
    }
}

module.exports= TokenService