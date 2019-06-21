import React, {Component} from 'react'
import './button'

class ButtonTemplate extends Component{
    render(){
        return <button type={this.props.type} className={this.props.className} >{this.props.label}</button>
    }
}

export default ButtonTemplate