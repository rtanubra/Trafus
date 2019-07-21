import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ErrorMessage from '../../components/error/ErrorMessage'
import TrafusContext from '../../contexts/trafus_context'
import ButtonTemplate from '../../components/button/button'
import config from '../../config'

class TeamLanding extends Component{
    state={
        teams:[],
        user: {}
    }
    componentDidMount(){
        const {userId} = this.props.match.params
        const base_url = config.API_ENDPOINT
        return fetch(`${base_url}users/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({"id":userId}),
            })
            .then(res =>{
                if (!res.ok){
                   return res.json().then(jsonRes=>{}) 
                }
                else{
                    return res.json()
                }
            }
        ).then(user=>{
            this.setState({user})
        })
    }
    render(){
        const user = this.state.user? this.state.user.user_name : ""
        return (
        <div>
            <h1>Welcome {user}</h1>

        </div>)
    }
}

export default TeamLanding