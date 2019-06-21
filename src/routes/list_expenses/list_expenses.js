import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import CategorySummaryTable from '../../components/category/category_summary'
import Expense from "../../components/expense/expense"
import './list_expenses.css'
import {Link} from 'react-router-dom'

class ListExpenses extends Component{
    static contextType = TrafusContext
    state ={
        teams : this.context.trafus_teams,
        categories: this.context.trafus_categories,
        expenses:this.context.trafus_expenses
    }

    render(){
        const {userId,categoryId, teamId} = this.props.match.params
        const team = this.state.teams.filter(team=>{
            return team.id == teamId
        })[0]
        const category = this.state.categories.filter(category=>{
            return category.id == categoryId
        })[0]
        const expenseList = this.state.expenses.filter(expense=>{
            return expense.category_id == categoryId
        })
        const expenseListDisplay = expenseList.map(expense=>{
            return <Expense key={`expense_${expense.id}`} expense={expense}/>
        })
        return (
            <div>  
                <h2>{`${team.name}`}</h2>
                <h3>{`${category.name}`}</h3>
                <CategorySummaryTable category ={category} expenses={this.state.expenses} />
                <ul>{expenseListDisplay}</ul>
                <button className="css_add_expense">Add Expense</button>
                <Link to={`/${userId}/${teamId}`}>
                    <button className="css_go_back">Back to Categories</button>
                </Link>
            </div>
        )
    }
}
export default ListExpenses