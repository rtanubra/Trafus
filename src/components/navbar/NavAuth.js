import './navbar.css'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import TrafusContext from '../../contexts/trafus_context'
import TokenService from '../../services/token-services'

class NavAuth extends Component{
    static contextType= TrafusContext
    handleLogout=()=>{
        TokenService.deleteAutthToken()
        this.context.toggleLogin(false)
    }
    render(){
        if (!this.props.loggedin){
            return(
                <div className="topnav">
                    <Link to={`/`} ><h1>Trafus</h1></Link>
                    
                    <div className='css-auth'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                        
                        
                    </div>
                </div>
            )
        } else {
            return (
                <div className="topnav">
                    <Link to={`/`} ><h1>Trafus</h1></Link>
                    <div className='css-auth'>
                        <Link to={`/teams/user/${window.localStorage.getItem('user_id')}/`} >Switch Team</Link>
                        <Link  onClick={()=>{this.handleLogout()}} className="" to={''} >Logout</Link>
                    </div>
                </div>
            )
        }
    }
}

export default NavAuth