const TokenService = {
    saveAuthToken(authToken){
        window.localStorage.setItem('authToken', authToken)
    },
    deleteAutthToken(){
        window.localStorage.removeItem('authToken')
    }
}

module.exports= TokenService