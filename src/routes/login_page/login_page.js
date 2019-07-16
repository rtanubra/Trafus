import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import ErrorMessage from '../../components/error/ErrorMessage'
import TrafusContext from '../../contexts/trafus_context'
import ButtonTemplate from '../../components/button/button'
import config from '../../config'
import TokenService from '../../services/token-services'

class LoginPage extends Component{
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

        
        return fetch(`${base_url}auth/login/`, {
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
                    return res.json().then(jsonRes=>{
                        console.log(jsonRes)
                        this.context.toggleLogin(true)
                        TokenService.saveAuthToken(jsonRes.authToken)
                        this.setState({success:true})
                    })
                }
            }
        )
    }
    handlePasswordChange= (event)=>{
        const password = event.target.value
        let error_user_name = this.state.error.error_user_name
        let error_password = false
        let error_message_user_name =this.state.error_message.error_message_user_name
        let error_message_password= ""
        const error_main = false
        const error_message_main=""
        if (password.length<1){
            error_password = true
            error_message_password = "Password is required"
        }
        this.setState({
            password,
            error:{error_user_name,error_password,error_main},
            error_message:{error_message_user_name,error_message_password,error_message_main}
            
        })
    }
    //static contextType = TrafusContext
    handleNameChange = (event)=>{
        const user_name = event.target.value;
        let error_user_name = false
        let error_password = this.state.error.error_password
        let error_message_user_name = ""
        let error_message_password= this.state.error_message_password
        const error_main = false
        const error_message_main=""
        if (user_name.length<3){
            error_user_name = true
            error_message_user_name = "User Name should be longer than 3 characters"
        }
        if (user_name.indexOf(' ') >-1){
            error_user_name= true
            error_message_user_name = "User Name cannot contain ' ' spaces"
        }
        this.setState({
            user_name,
            error:{
                error_user_name,
                error_password,
                error_main
            },
            error_message:{
                error_message_user_name,
                error_message_password,
                error_message_main
            },
            success:false
        })
    }
    state = {
        user_name:"",
        password:"",
        error:{
            error_main:false,
            error_user_name:false,
            error_password:false
        },
        error_message:{
            error_message_main:"",
            error_message_user_name:"",
            error_message_password:""
        },
        success:false
    }
    render(){
        if (this.state.success){
            return <Redirect to={`/${1}/${1}/`}/>
        }
        return (
            <div>
                <h2>Welcome Back</h2>
                <form className='css-login-form' onSubmit={this.handleSubmit}>
                    <fieldset>
                        {this.state.error.error_main? <ErrorMessage message={this.state.error_message.error_message_main}/>:""}
                        <legend>Login</legend>
                        {this.state.error.error_user_name? <ErrorMessage message={this.state.error_message.error_message_user_name} />  : ""}
                        <label htmlFor="js_user_name" >Username</label>
                        <input required onChange={this.handleNameChange} value={this.state.user_name} id="js_user_name" name="js_user_name" type="text" />
                        <br/>
                        {this.state.error.error_password? <ErrorMessage message={this.state.error_message.error_message_password} />  : ""}
                        <label htmlFor="js_password" >Password</label>
                        <input required onChange={this.handlePasswordChange} value={this.state.password} id="js_password" name="js_password" type="password" />
                        <br/>
                        <ButtonTemplate type="submit" className="css_submit_button" label="Submit"  />
                    </fieldset>
                </form>
            </div>
        )}
}

export default LoginPage