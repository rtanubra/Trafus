import React, {Component} from  'react'
import {Redirect} from 'react-router-dom'
import ButtonTemplate from '../../components/button/button'
import './landing_page.css'
import TrafusContext from '../../contexts/trafus_context'
import config from '../../config'
import TokenService from '../../services/token-services'

class LandingPage extends Component{
    static contextType = TrafusContext
    handleLogin=()=>{
        const base_url = config.API_ENDPOINT
        return fetch(`${base_url}auth/login/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({user_name:window.btoa("dunder"),password:window.btoa("hello_dunder")}),
        }).then(res=>res.json()).then(jsonRes=>{
            TokenService.saveAuthToken(jsonRes.authToken,jsonRes.payload)
            this.context.toggleLogin(true)
        })
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        this.handleLogin()
    }
    render(){
        if(window.localStorage.getItem('user_id') && window.localStorage.getItem('team_id')){
            return <Redirect to={`/${window.localStorage.getItem("user_id")}/${window.localStorage.getItem("team_id")}/`}/>
        }
        return (
            <div>
                <header role="banner">
                    <h1>Trafus- Track It For Us </h1>
                </header>
                <section>
                    <h2>Trafus</h2>
                    <p>
                        Build your team budget and let Trafus track it for you! Simply follow the steps below.
                    </p>
                    <div className="css-instructions-list">
                        <ol className="css-landing-page">
                            <li>Create a User</li>
                            <li>Join an existing team or Create your own team</li>
                            <li>Create categories for your team's budget</li>
                            <li>Add Expenses to each category as you spend.</li>
                            <li>Quickly view your team and category summaries. </li>
                            <li>Make sure your team stays on budget.</li>
                        </ol>
                    </div>
                </section>
                <section>
                    <h2>Demo User</h2>
                    <p>To give trafus a try click the login button below. Then you can dive right into Trafus as a team member of the Team 1 </p>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="demo_user">Username</label>
                        <input type="text" value="dunder" readOnly id="demo_user" name="demo_user"/>
                        <br/>
                        <label htmlFor="demo_password">Password</label>
                        <input type="password" value="hello_dunder" readOnly name="demo_password" id="demo_password"/>
                        <br/>
                        <ButtonTemplate onClick={this.handleLogin} type="submit" className='css_submit_button'  label="Login as dunder !"/>
                    </form>
                </section>
            </div>

        )
    }
}
export default LandingPage