import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import CategorySummaryTable from '../../components/category/category_summary'
import Expense from "../../components/expense/expense"
import './list_expenses.css'
import {Link} from 'react-router-dom'
import ButtonTemplate from "../../components/button/button"
class ListExpenses extends Component{
    static contextType = TrafusContext
    state ={
        teams : this.context.trafus_teams,
        categories: this.context.trafus_categories,
        expenses:this.context.trafus_expenses
    }

    render(){
        const {userId,categoryId, teamId} = this.props.match.params
        const team = this.state.teams.find(team=>{
            return team.id === parseInt(teamId)
        })
        const category = this.state.categories.find(category=>{
            return category.id === parseInt(categoryId)
        })
        const expenseList = this.state.expenses.filter(expense=>{

            return expense.active===true && expense.category_id === parseInt(categoryId)

        })
        const expenseListDisplay = expenseList.map(expense=>{
            return <Expense userId={userId} categoryId={categoryId} teamId={teamId}  key={`expense_${expense.id}`} expense={expense}/>
        })
        return (
            <div>  
                <h2>{`${team.name}`}</h2>
                <h3>{`${category.name}`}</h3>
                <CategorySummaryTable category ={category} expenses={this.state.expenses} />
                <ul>{expenseListDisplay}</ul>

                <Link to={`/${userId}/${teamId}/${categoryId}/add_expense`}>
                    <ButtonTemplate className="css_add_expense" label="Add an Expense"/>
                </Link>
                <Link to={`/${userId}/${teamId}`}>
                    <button className="css_go_back">Back to Categories</button>
                </Link>
            </div>
        )
    }
}
export default ListExpenses