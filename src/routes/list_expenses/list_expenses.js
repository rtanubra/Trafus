import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import CategorySummaryTable from '../../components/category/category_summary'
class ListExpenses extends Component{
    static contextType = TrafusContext
    state ={
        teams : this.context.trafus_teams,
        categories: this.context.trafus_categories,
        expenses:this.context.trafus_expenses
    }
    createExpenseList(){}



    render(){
        const {categoryId, teamId} = this.props.match.params
        const team = this.state.teams.filter(team=>{
            return team.id == teamId
        })[0]
        const category = this.state.categories.filter(category=>{
            return category.id = categoryId
        })[0]

        return (
            <div>
                <h2>{`${category.name} summary - for - ${team.name}`}</h2>
            </div>
        )
    }
}
export default ListExpenses