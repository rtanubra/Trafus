import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import CategorySummaryTable from '../../components/category/category_summary'
import Expense from "../../components/expense/expense"
import '../../components/button/button.css'
import {Link,Redirect} from 'react-router-dom'
import ButtonTemplate from "../../components/button/button"
class ListExpenses extends Component{
    static contextType = TrafusContext
    state ={
        teams : [...this.context.trafus_teams],
        categories: [...this.context.trafus_categories],
        expenses:[...this.context.trafus_expenses]
    }
    calculateCurrentExpense(category,expenses){
        let spent = 0
        expenses.forEach(expense=>{
            if(expense.category_id === category.id ){
                spent += expense.expense
            }
        })
        return spent

    }


    render(){
        const {userId,categoryId, teamId} = this.props.match.params
        const team = this.state.teams.find(team=>{
            return team.id === parseInt(teamId)
        })
        const category = this.context.trafus_categories.find(category=>{
            return category.id === parseInt(categoryId)
        })
        const expenseList = this.context.trafus_expenses.filter(expense=>{

            return  expense.category_id === parseInt(categoryId)

        })
        const expenseListDisplay = expenseList.map(expense=>{
            return <Expense userId={userId} categoryId={categoryId} teamId={teamId}  key={`expense_${expense.id}`} expense={expense}/>
        })
        const current_expense= this.calculateCurrentExpense(category,expenseList)

        if (!window.localStorage.getItem('authToken')||!window.localStorage.getItem('user_id')||!window.localStorage.getItem('team_id')){
            return <Redirect to=""/>
        }
        if (category){  
            return (
                <div>
                    {team?<h2>{`${team.name}`}</h2>:""}
                    <h3>{`${category.name}`}</h3>
                    <Link to={`/${userId}/${teamId}/${categoryId}/add_expense`}>
                        <ButtonTemplate className="css_add_expense" label="Add an Expense"/>
                    </Link>
                    <Link to={`/${userId}/${teamId}`}>
                        <button className="css_back_button">Back to Categories</button>
                    </Link>
                    <CategorySummaryTable budget ={category.budget} current_expense={current_expense} />
                    <ul>{expenseListDisplay}</ul>
                    
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}
export default ListExpenses