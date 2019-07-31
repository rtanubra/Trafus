import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import config from '../../config'
import {Link} from 'react-router-dom'

import CreateTeam from '../../components/teams/createTeam'
import JoinTeam from '../../components/teams/joinTeam'

class TeamLanding extends Component{
    handleCreateTeam = (team_id)=>{
        window.localStorage.setItem('team_id',team_id)
        this.setState({team_id,success:true})
    }
    handleJoinTeam=(team_id)=>{
        window.localStorage.setItem('team_id',team_id)
        this.setState({team_id,success:true})
    }
    state={
        teams:[],
        user: {},
        team_id:"",
        success:false
    }
    componentDidMount(){
        const {userId} = this.props.match.params
        const base_url = config.API_ENDPOINT
        fetch(`${base_url}users/${userId}`)
            .then(res =>{
                if (!res.ok){
                   return res.json()
                }
                else{
                    return res.json()
                }
            }
        ).then(user=>{
            this.setState({user})
        })

        fetch(`${base_url}teams/`)
            .then(res=>{return res.json()}).then(teams=>{
                this.setState({teams})
            })
    }
    render(){
        const user = this.state.user? this.state.user.user_name : ""
        const {userId} =this.props.match.params
        if (this.state.success){
            return <Redirect to={`/${this.state.user.id}/${this.state.team_id}/`} />
        }
        return (
        <div>
            <h1>Welcome {user}</h1>
            <h2>Team Options</h2>
            <Link to={`/`} ><button className="css_back_button" >Stay with my team</button></Link>
            <h3>Join An Existing Team</h3>
                <JoinTeam handleJoinTeam={this.handleJoinTeam} userId={parseInt(userId)} teams={this.state.teams}/>
            <h3>Create New Team</h3>
                <CreateTeam userId={parseInt(userId)} handleCreateTeam={this.handleCreateTeam} />
                <br/>
        </div>)
    }
}

export default TeamLanding