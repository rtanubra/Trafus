import React, {Component} from 'react'
import './teamRadioButton.css'

class TeamButton extends Component{
    render(){
        return (<>
            <input className="css_radio_teams" type="radio" name="team-existing" value={this.props.team.id}/>{this.props.team.name}
            <br/>
        </>)
    }
}

export default TeamButton