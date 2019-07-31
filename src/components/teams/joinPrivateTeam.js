import React, {Component} from 'react';
import ErrorMessage from '../error/ErrorMessage'
import config from '../../config'
import '../button/button.css'

class JoinPrivateTeam extends Component {
    state={
        password:"",
        password_error:false,
        password_error_message:""
    }
    handlePasswordChange=(e)=>{
        const password = e.target.value
        this.setState({password})
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        const base_url =config.API_ENDPOINT
        return fetch(`${base_url}users`,{
                    method:"PATCH",
                    headers:{'content-type': 'application/json'},
                    body: JSON.stringify({id:this.props.userId , team_id:this.props.team.id, password:this.state.password})
        }).then((res)=>{
            return res.json().then(resJson=>{
                if (resJson.error){
                    this.setState({
                        password_error:true,
                        password_error_message: resJson.error
                    })
                }
                else {
                    this.props.handleJoinTeam(this.props.team.id)
                }
            })
        })
    }
    render(){
        return (
        <form>
            <fieldset onSubmit={this.handleSubmit}>
                <legend>{`Join - ${this.props.name} `}</legend>
                <p>{`
                    ${this.props.name} is a private team, a password is required to join.
                    If you created this team, please use the password you created.
                    If you were invited to this team, please use the password given to you on your invite!
                    `}</p>
                    {this.state.password_error?<ErrorMessage message={this.state.password_error_message} />:"" }
                    <label htmlFor="js_password">Password : </label>
                    <input required onChange={this.handlePasswordChange} value ={this.state.password} type="password" name="js_password" id="js_password" />
                    <br/>
                    <button onClick={this.handleSubmit} className='css_submit_button' type="submit" >Submit</button>
                    <button className="css_back_button" onClick={this.props.toggleJoinPrivate}>Back to Teams List</button>
            </fieldset>
        </form>)
    }
}

export default JoinPrivateTeam