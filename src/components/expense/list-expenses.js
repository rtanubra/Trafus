import React, {Component} from 'react'
import TrafusContext from "../../contexts/trafus_context"
import CategorySummaryTable from '../../components/category/category_summary'
import Expense from "../../components/expense/expense"
import {Link,Redirect} from 'react-router-dom'
import ButtonTemplate from "../../components/button/button"

//config use
import config from '../../config'

class ListExpensesComp extends Component{
    static contextType = TrafusContext
    state ={
        teams : [...this.context.trafus_teams],
        categories: [...this.context.trafus_categories],
        expenses:[...this.context.trafus_expenses],
        users:""
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
    
    componentDidMount(){
        const base_url = config.API_ENDPOINT
        fetch(`${base_url}users`).then(res=>{
            return res.json()
        }).then(jsonRes=>{
            this.setState({users:jsonRes})
        })
    }


    render(){
        const {userId,categoryId, teamId} = this.props
        const team = this.state.teams.find(team=>{
            return team.id === parseInt(teamId)
        })
        const category = this.context.trafus_categories.find(category=>{
            return category.id === parseInt(categoryId)
        })
        const expenseList = this.context.trafus_expenses.filter(expense=>{

            return  expense.category_id === parseInt(categoryId)

        })
        expenseList.sort((a,b)=>{
            return a.id < b.id
        })
        const expenseListDisplay = expenseList.map(expense=>{
            const user = this.state.users? this.state.users.find(usr=>{
                return usr.id ===parseInt(expense.creator_id)
            }) : ""
            return <Expense user={user} userId={userId} categoryId={categoryId} teamId={teamId}  key={`expense_${expense.id}`} expense={expense}/>
        })
        const current_expense= this.calculateCurrentExpense(category,expenseList)

        if (!window.localStorage.getItem('authToken')||!window.localStorage.getItem('user_id')||!window.localStorage.getItem('team_id')){
            return <Redirect to=""/>
        }
        if (category){  
            return (
                <div>
                    
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
export default ListExpensesComp