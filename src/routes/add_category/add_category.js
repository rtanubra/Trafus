import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import {Redirect} from 'react-router-dom'
import './add_category.css'
import AddCategoryForm from '../../components/forms/addCategory'


class AddCategory extends Component {
    static contextType = TrafusContext
    
    render(){
        const {userId, teamId} = this.props.match.params
        const team =this.context.trafus_teams.find(team=>{
            return team.id === parseInt(teamId)
        })
        if (!window.localStorage.getItem('authToken')||!window.localStorage.getItem('user_id')||!window.localStorage.getItem('team_id')){
            return <Redirect to=""/>
        }
        if (!team){
            return <div></div>
        }
        return (
            <div>
                <h2>{team.name} Categories</h2>
                <AddCategoryForm 
                    userId={userId} teamId={teamId}
                />
            </div>
        )
    }
}
export default AddCategory
