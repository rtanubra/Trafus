import React, {Component} from "react"
import './warning.css'
import '../button/button.css'

class WarningDelete extends Component {
    render(){
        return (
        <div className="css-warning-box">
            <h3 className="css-warning" >Warning You are about to delete <b>{this.props.name}</b></h3>
            <p>If you are sure click the "Delete confirmed" button below</p>
            <button onClick={this.props.function} className="css_back_button">Delete confirmed</button>
            <button className="css_submit_button" onClick={this.props.backFunction}>Back</button>
        </div>
        )
    }
}

export default WarningDelete