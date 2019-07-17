import React, {Component} from 'react'
import './add_expense.css'
import {Redirect} from 'react-router-dom'

import AddExpenseForm from '../../components/forms/addExpense'
import TrafusContext from '../../contexts/trafus_context'

class AddExpense extends Component{
    static contextType = TrafusContext
    render(){
        const {userId, teamId, categoryId} = this.props.match.params
        const category = this.context.trafus_categories.find(category=>{
            return category.id === parseInt(categoryId)
        })
        if (!this.context.loggedIn){
            return <Redirect to=""/>
        }
        return (
            <div>
                <h2>{`Add Expense to - ${category.name}`}</h2>
                <AddExpenseForm 
                    userId={userId} 
                    teamId={teamId} 
                    categoryId={categoryId} 
                    category={category}
                />
            </div>
        )
    }
}

export default AddExpense