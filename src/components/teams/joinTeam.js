import React, {Component} from 'react'
import config from '../../config'
import JoinPrivateTeam from './joinPrivateTeam'
import './teamRadioButton.css'

class JoinTeam extends Component{
    toggleJoinPrivate=(e)=>{
        e.preventDefault()
        this.setState({join_private:false})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const base_url =config.API_ENDPOINT
        const team_id = parseInt(this.state.team)
        const userId = parseInt(this.props.userId)
        const team = this.props.teams.find(t=>{
            return t.id === team_id
        })
        if (team.password){
            this.setState({join_private:true})
        }
        else {
            return fetch(`${base_url}users`,{
                        method:"PATCH",
                        headers:{'content-type': 'application/json'},
                        body: JSON.stringify({id:userId , team_id:team_id})
            }).then(()=>{
                this.props.handleJoinTeam(team_id)
            })
        }
    }
    onTeamChange=(event)=>{
        this.setState({
            team:event.target.value
        })

    }
    state = {
        join_private:false,
        team:1,

    }
    createButton(team){
        const key = `${team.name}_${team.id}`
        return (
        <div key={`div_${key}`}>
            <input className={'css_radio_teams'} onChange={this.onTeamChange} checked={parseInt(this.state.team)=== parseInt(team.id)}  type="radio" name="team_select" value={team.id} key={key}/>
            {`${team.name} - ${team.password? 'Private' :"Public"}`}
        </div>)
    }
    render(){
        const team_id = parseInt(this.state.team)
        const team = this.props.teams.find(t=>{
            return t.id === team_id
        })
        const teamsButtons = this.props.teams.length >0 ? this.props.teams.map(team=>{
            return  this.createButton(team) }) : ""
        
        if (this.state.join_private){
            return <JoinPrivateTeam handleJoinTeam={this.props.handleJoinTeam} toggleJoinPrivate={this.toggleJoinPrivate} userId={this.props.userId} team={team} name={team.name}/>
        }
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