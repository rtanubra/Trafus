import React, {Component} from  'react'
import {Link} from 'react-router-dom'
import ButtonTemplate from '../../components/button/button'
import './landing_page.css'

class LandingPage extends Component{
    handleSubmit = (event)=>{
        event.preventDefault()
    }
    render(){
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
                    <ol>
                        <li>Create your Trafus Team.</li>
                        <li>Create your budget Categories for your Team.</li>
                        <li>Add Expenses to each Category as you spend.</li>
                        <li>Quickly view your Team summary and Category summaries. </li>
                        <li>Make sure your team stays on budget.</li>
                    </ol>
                </section>
                <section>
                    <h2>Demo User</h2>
                    <p>To give trafus a try click the login button below. Then you can dive right into Trafus as a team member of the test_1 team</p>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="demo_user">Username</label>
                        <input type="text" value="user_1" readOnly id="demo_user" name="demo_user"/>
                        <br/>
                        <label htmlFor="demo_password">Password</label>
                        <input type="password" value="password1" readOnly name="demo_password" id="demo_password"/>
                        <br/>
                        <Link to={`/1/1`}>
                            <ButtonTemplate type="submit" className='css_submit_button'  label="Login as user_1 !"/>
                        </Link>
                    </form>
                </section>
            </div>

        )
    }
}
export default LandingPage