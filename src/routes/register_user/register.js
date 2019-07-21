import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ErrorMessage from '../../components/error/ErrorMessage'
import TrafusContext from '../../contexts/trafus_context'
import ButtonTemplate from '../../components/button/button'
import config from '../../config'



import ValidateHelper from '../../services/validator'

class RegisterPage extends Component{
    static contextType=TrafusContext

    handleSubmit= (e)=>{
        e.preventDefault()
        const base_url = config.API_ENDPOINT
        const password_plain = this.state.password
        const user_name_plain = this.state.user_name
        const password_encrypt = window.btoa(password_plain)
        const user_name_encrypt = window.btoa(user_name_plain)
        
        let error_user_name = this.state.error.error_user_name
        let error_password = this.state.error.error_password
        let error_message_user_name =this.state.error_message.error_message_user_name
        let error_message_password= this.state.error_message.error_message_password
        let error_main = false
        let error_message_main=""

        
        return fetch(`${base_url}users/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({user_name:user_name_encrypt,password:password_encrypt}),
            })
            .then(res =>{
                if (!res.ok){
                   return res.json().then(jsonRes=>{
                       error_main = true
                       error_message_main=jsonRes.error
                       this.setState({
                           error:{error_user_name,error_main,error_password},
                           error_message:{error_message_user_name,error_message_password,error_message_main}
                       })
                    }) 
                }
                else{
                    this.setState({success:true})
                }
            }
        )
    }
    handlePasswordRepeatChange= (event)=>{
        const password_repeat = event.target.value
        let error_user_name = this.state.error.error_user_name
        let error_password = this.state.error.error_password
        let error_password_repeat = false
        let error_message_user_name =this.state.error_message.error_message_user_name
        let error_message_password= this.state.error_message.error_message_password
        let error_message_password_repeat = ""
        const error_main = false
        const error_message_main=""
        if (password_repeat!== this.state.password){
            error_password_repeat=true
            error_message_password_repeat= "Repeat Password does not match Password"
        }
        this.setState({
            password_repeat,
            error:{error_user_name,error_password,error_main,error_password_repeat},
            error_message:{error_message_user_name,error_message_password,error_message_main,error_message_password_repeat}
            
        })
        
    }
    handlePasswordChange= (event)=>{
        const password = event.target.value
        let error_user_name = this.state.error.error_user_name
        let error_password = false
        let error_password_repeat = this.state.error.error_password_repeat
        let error_message_user_name =this.state.error_message.error_message_user_name
        let error_message_password= ""
        let error_message_password_repeat = this.state.error_message.error_message_password_repeat
        const error_main = false
        const error_message_main=""
        const valid = ValidateHelper.passwordCheck(password)
        if(!valid[0]){
            error_password = true
            error_message_password = `Password ${valid[1]}`
        }

        this.setState({
            password,
            error:{error_user_name,error_password,error_main,error_password_repeat},
            error_message:{error_message_user_name,error_message_password,error_message_main,error_message_password_repeat}
            
        })
    }
    //static contextType = TrafusContext
    handleNameChange = (event)=>{
        const user_name = event.target.value;
        let error_user_name = false
        let error_password = this.state.error.error_password
        let error_password_repeat = this.state.error.error_password_repeat
        let error_message_user_name = ""
        let error_message_password= this.state.error_message.error_message_password
        let error_message_password_repeat = this.state.error_message.error_message_password_repeat
        const error_main = false
        const error_message_main=""
        
        const valid = ValidateHelper.user_nameCheck(user_name)
        if (!valid[0]){
            error_user_name = true
            error_message_user_name = `Username ${valid[1]}`
        }

        this.setState({
            user_name,
            error:{
                error_user_name,
                error_password,
                error_main,
                error_password_repeat
            },
            error_message:{
                error_message_user_name,
                error_message_password,
                error_message_password_repeat,
                error_message_main
            },
            success:false
        })
    }
    state = {
        user_name:"",
        password:"",
        password_repeat:"",
        error:{
            error_main:false,
            error_user_name:false,
            error_password:false,
            error_password_repeat:false
        },
        error_message:{
            error_message_main:"",
            error_message_user_name:"",
            error_message_password:"",
            error_message_password_repeat:""
        },
        success:false
    }
    render(){
        if (this.state.success){
            return <Redirect to={`/`}/>
        }
        return (
            <div>
                <h2>Welcome New User</h2>
                <form className='css-login-form' onSubmit={this.handleSubmit}>
                    <fieldset>
                        {this.state.error.error_main? <ErrorMessage message={this.state.error_message.error_message_main}/>:""}
                        <legend>Register</legend>
                        {this.state.error.error_user_name? <ErrorMessage message={this.state.error_message.error_message_user_name} />  : ""}
                        <label htmlFor="js_user_name" >Username</label>
                        <input required onChange={this.handleNameChange} value={this.state.user_name} id="js_user_name" name="js_user_name" type="text" />
                        <br/>
                        {this.state.error.error_password? <ErrorMessage message={this.state.error_message.error_message_password} />  : ""}
                        <label htmlFor="js_password" >Password</label>
                        <input required onChange={this.handlePasswordChange} value={this.state.password} id="js_password" name="js_password" type="password" />
                        <br/>
                        {this.state.error.error_password_repeat? <ErrorMessage message={this.state.error_message.error_message_password_repeat} />  : ""}
                        <label htmlFor="js_password_repeat" >Repeat Password</label>
                        <input required onChange={this.handlePasswordRepeatChange} value={this.state.password_repeat} id="js_password_repeat" name="js_password_repeat" type="password" />
                        <br/>
                        <ButtonTemplate type="submit" className="css_submit_button" label="Submit"  />
                    </fieldset>
                </form>
            </div>
        )}
}

export default RegisterPage