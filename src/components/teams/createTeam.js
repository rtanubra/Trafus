import React, {Component} from 'react'
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../error/ErrorMessage'
import config from '../../config'

import '../button/button.css'

class CreateTeam extends Component{
    handleNameChange=(e)=>{
        const name = e.target.value
        let name_error= false
        let name_error_message=""
        const valid = ValidateHelper.nameCheck(name)
        if (!valid[0]){
            name_error=true
            name_error_message = `Team Name ${valid[1]}`
        }
        this.setState({name,name_error,name_error_message })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const base_url =config.API_ENDPOINT
        return fetch(`${base_url}teams/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({name:this.state.name}),
            })
            .then(res =>{
                return res.json()
                
            }
        ).then(jsonRes=>{
            if (jsonRes.error){
                this.setState({
                    name_error:true,
                    name_error_message:jsonRes.error
                })
            }
            else{
                    const team_id = parseInt(jsonRes.id)
                    const userId = parseInt(this.props.userId)
                    return fetch(`${base_url}users`,{
                        method:"PATCH",
                        headers:{'content-type': 'application/json'},
                        body: JSON.stringify({id:userId , team_id:team_id})
                    }).then(res=>res.json()).then(user=>{
                        this.props.handleCreateTeam(user.team_id)
                    })
                }
        })

    }
    state={
        name:"",
        name_error:false,
        name_error_message:""
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} >
                <fieldset>
                    {this.state.name_error?<ErrorMessage message={this.state.name_error_message} />:"" }
                    <legend>Create a new team</legend>
                    <label htmlFor="js_team_name" >Team Name : </label>
                    <input required onChange={this.handleNameChange} value={this.state.name} type="text" name="js_team_name" id="js_team_name"/>
                    <br/>
                    <button className='css_submit_button' type='submit'>Create New Team</button>
                </fieldset>
            </form>
        )
    }
}
export default CreateTeam

