import React, {Component} from 'react'
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../error/ErrorMessage'
import config from '../../config'

import '../button/button.css'

class CreateTeam extends Component{
    togglePrivate = (e)=>{
        e.preventDefault()
        if (this.state.private){
            this.setState({
                password:"",
                password_error:false,
                password_error_message:"",
                password_repeat:"",
                password_repeat_error:false,
                password_repeat_error_message:"",
                private:false
            })
        }
        else {
            this.setState({
            private:true
        })
        }
    }
    handlePasswordChange=(e)=>{
        const password = e.target.value
        let password_error = false
        let password_error_message= ""
        const valid  = ValidateHelper.passwordCheck(password)
        if (!valid[0]){
            password_error= true
            password_error_message = `Password ${valid[1]}`
        }
        this.setState({
            password,
            password_error,password_error_message
        })

    }
    handlePasswordRepeatChange=(e)=>{
        const password_repeat = e.target.value
        const password = this.state.password
        let password_repeat_error = false
        let password_repeat_error_message = ""
        if (password_repeat !== password ){
            password_repeat_error = true
            password_repeat_error_message = `Repeat Password provided does not match Password`
        }
        this.setState({
            password_repeat,password_repeat_error,password_repeat_error_message
        })

    }
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
        if (this.state.name_error || this.state.password_error|| this.state.password_repeat_error){
            //exit if there is an error
            return null
        }
        const team = this.state.password? {name:this.state.name,password:this.state.password}:{name:this.state.name}
        return fetch(`${base_url}teams/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({team}),
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
        name_error_message:"",
        password:"",
        password_error:false,
        password_error_message:"",
        password_repeat:"",
        password_repeat_error:false,
        password_repeat_error_message:"",
        private:false
    }
    render(){
        if (!this.state.private){
            return (
            <div>
                <button onClick={this.togglePrivate}>Create a Private Team</button>
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
            </div>)
        }
        else {
        return (
            <div>
                <button onClick={this.togglePrivate}>Create a Public Team</button>
                <form onSubmit={this.handleSubmit} >
                <fieldset>
                    <legend>Create a new team</legend>
                    {this.state.name_error?<ErrorMessage message={this.state.name_error_message} />:"" }
                    <label htmlFor="js_team_name" >Team Name : </label>
                    <input required onChange={this.handleNameChange} value={this.state.name} type="text" name="js_team_name" id="js_team_name"/>
                    <br/>
                    {this.state.password_error?<ErrorMessage message={this.state.password_error_message} />:"" }
                    <label htmlFor="js_password">Password : </label>
                    <input required onChange={this.handlePasswordChange} value ={this.state.password} type="password" name="js_password" id="js_password" />
                    <br/>
                    {this.state.password_repeat_error?<ErrorMessage message={this.state.password_repeat_error_message} />:"" }
                    <label htmlFor="js_password_repeat">Repeat Password : </label>
                    <input required onChange={this.handlePasswordRepeatChange} value ={this.state.password_repeat} type="password" name="js_password_repeat" id="js_password_repeat" />
                    <br/> 
                    <button className='css_submit_button' type='submit'>Create New Team</button>
                </fieldset>
                </form>
            </div>
        )
        }
    }
}
export default CreateTeam

