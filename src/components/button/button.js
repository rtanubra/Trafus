import React, {Component} from 'react'
import './button.css'

class ButtonTemplate extends Component{

    render(){
        if (this.props.onClick){
            return <button onClick={()=>{this.props.onClick()}} type={this.props.type} className={this.props.className} >{this.props.label}</button>
        }
        return <button type={this.props.type} className={this.props.className} >{this.props.label}</button>
    }
}

export default ButtonTemplate