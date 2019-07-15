import './navbar.css'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component{
    
    render(){
        return (
        <div className="topnav">
            <Link to={`/`} ><h1>Trafus</h1></Link>
        </div>
    )}
}

export default NavBar