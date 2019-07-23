import React, {Component} from 'react'

class TeamButton extends Component{
    render(){
        return (<>
            <input type="radio" name="team-existing" value={this.props.team.id}/>{this.props.team.name}
            <br/>
        </>)
    }
}

export default TeamButton