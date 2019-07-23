import React, {Component} from 'react'
import TeamButton from './teamRadioButton'
import ButtonTemplate from '../button/button'
import config from '../../config'

class JoinTeam extends Component{
    handleSubmit=(event)=>{
        event.preventDefault()
        const base_url =config.API_ENDPOINT
        const team_id = parseInt(this.state.team)
        const userId = parseInt(this.props.userId)

        return fetch(`${base_url}users`,{
                    method:"PATCH",
                    headers:{'content-type': 'application/json'},
                    body: JSON.stringify({id:userId , team_id:team_id})
        }).then(()=>{
            this.props.handleJoinTeam(team_id)
        })
    }
    onTeamChange=(event)=>{
        this.setState({
            team:event.target.value
        })

    }
    state = {
        team:1,

    }
    createButton(team){
        const key = `${team.name}_${team.id}`
        return (<div key={`div_${key}`}><input className={'css-team-radio'} onChange={this.onTeamChange} checked={parseInt(this.state.team)=== parseInt(team.id)}  type="radio" name="team_select" value={team.id} key={key}/>{team.name}</div>)
    }
    render(){
        
        const teamsButtons = this.props.teams.length >0 ? this.props.teams.map(team=>{
            return  this.createButton(team) }) : ""

        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Select a team to join</legend>
                    {teamsButtons}
                    <button onClick={this.handleSubmit} className={`css_submit_button`}  type="submit">Join Team</button>
                </fieldset>
            </form>
        )
    }
}
export default JoinTeam