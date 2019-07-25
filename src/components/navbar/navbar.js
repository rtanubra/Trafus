import './navbar.css'
import React, {Component} from 'react'
import TrafusContext from '../../contexts/trafus_context'
import TokenService from '../../services/token-services'
import NavAuth from './NavAuth'

class NavBar extends Component{
    static contextType= TrafusContext
    handleLogout=()=>{
        TokenService.deleteAutthToken()
        this.context.toggleLogin(false)
    }
    render(){
        const loggedIn = window.localStorage.getItem('authToken') && window.localStorage.getItem('user_id') && window.localStorage.getItem('team_id')
        return <NavAuth loggedin={loggedIn} />
        }
}

export default NavBar