import './navbar.css'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component{
    
    render(){
        return (
        <div className="topnav">
            <Link to={`/`} ><h1>Trafus</h1></Link>
            <div className='css-auth'>
                <Link to={'/login'}>Login</Link>
                <Link to={''} >Logout</Link>
            </div>
        </div>
    )}
}

export default NavBar