import React, {Component} from 'react'
import './list_categories.css'
import TrafusContext from "../../contexts/trafus_context"
import Category from "../../components/category/category"
import TeamSummary from '../../components/team/team_summary'
import {Link} from 'react-router-dom'


class ListCategories extends Component {
    static contextType = TrafusContext

    state = {
        teams:this.context.trafus_teams,
        categories: this.context.trafus_categories,
        expenses:this.context.trafus_expenses
    }

    render(){
        const {userId, teamId} = this.props.match.params
        const teamCategories = this.state.categories.filter(category=>{

            return category.active===true && category.team_id === parseInt(teamId)
    
        })
        const teamCategoriesDisplayed = teamCategories.map(category=>{
            return <Category userId={userId} teamId={teamId}  category={category} key={`category_${category.id}`} expenses={this.state.expenses} />
        })
        const team = this.state.teams.filter(team=>{return team.id=== parseInt(teamId) })[0]
        return (
            <div>
                <h2>{`Current Budget for ${team.name}`}</h2>
                <TeamSummary categories ={teamCategories} />
                <Link to={`/${userId}/${teamId}/add_category`} >
                    <button className="css_add_category">Add a Category</button>
                </Link>
                {teamCategoriesDisplayed}
            </div>
            )
    }
}

export default ListCategories