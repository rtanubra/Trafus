import './navbar.css'
import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import TrafusContext from '../../contexts/trafus_context'
import TokenService from '../../services/token-services'

class NavBar extends Component{
    static contextType= TrafusContext
    componentDidMount(){
        if (window.sessionStorage.getItem('authToken') && !this.context.loggedIn){
            window.sessionStorage.removeItem('authToken')
            this.setState({redirect:true})
        }
    }
    
    handleLogout=()=>{
        TokenService.deleteAutthToken()
        this.context.toggleLogin(false)
    }
    render(){
        return (
        <div className="topnav">
            <Link to={`/`} ><h1>Trafus</h1></Link>
            <div className='css-auth'>
                {this.context.loggedIn? <Link  onClick={()=>{this.handleLogout()}} className="" to={''} >Logout</Link> :<Link to={'/login'}>Login</Link>}
            </div>
        </div>
    )}
}

export default NavBar