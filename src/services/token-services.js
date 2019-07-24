const TokenService = {
    saveAuthToken(authToken,payload){
        window.localStorage.setItem('team_id',payload.team_id)
        window.localStorage.setItem('user_id',payload.user_id)
        window.localStorage.setItem('authToken', authToken)
    },
    deleteAutthToken(){
        window.localStorage.removeItem('authToken')
        window.localStorage.removeItem('team_id')
        window.localStorage.removeItem('user_id')
    }
}

module.exports= TokenService