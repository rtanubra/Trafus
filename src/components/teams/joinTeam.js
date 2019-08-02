import React, {Component} from 'react'
import config from '../../config'
import JoinPrivateTeam from './joinPrivateTeam'
import './teams.css'

class JoinTeam extends Component{
    toggleViewPrivate =(e)=>{

    }
    toggleJoinPrivate=(e)=>{
        e.preventDefault()
        this.setState({view_private:!this.state.view_private})
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
        view_private:false
    }
    createButton(team){
        const key = `${team.name}_${team.id}`
        return (
        <div className={`${team.password?"css_private_team js_hide_team":"css_public_team"}`} key={`div_${key}`}>
            <input className={`css_radio_teams`} onChange={this.onTeamChange} checked={parseInt(this.state.team)=== parseInt(team.id)}  type="radio" name="team_select" value={team.id} key={key}/>
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
        if (this.state.view_private){
            const priv = document.getElementsByClassName("css_private_team")
            const pub =  document.getElementsByClassName("css_public_team")
            if (priv.length >0 && pub.length > 0 ){
                for (var i = 0; i< priv.length; i+=1){
                    priv[i].classList.remove('js_hide_team')
                }
                for (var j = 0; j< pub.length; j+=1){
                    pub[j].classList.add('js_hide_team')
                }
            }
        }else {
            const priv = document.getElementsByClassName("css_private_team")
            const pub =  document.getElementsByClassName("css_public_team")

            if (priv.length >0 && pub.length > 0 ){
                for (var x = 0; x< pub.length; x+=1){
                    pub[x].classList.remove('js_hide_team')
                }
                for (var y = 0; y< priv.length; y+=1){
                    priv[y].classList.add('js_hide_team')
                }

            }


        }
        return (
            <div>
                <button className="css_edit_category" onClick={this.toggleJoinPrivate}>{this.state.view_private?"View Public Teams":"View Private Teams"}</button>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>{this.state.view_private?"Join a Private Team":"Join a Public Team"}</legend>
                        {teamsButtons}
                        <button onClick={this.handleSubmit} className={`css_submit_button`}  type="submit">Join Team</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
export default JoinTeam