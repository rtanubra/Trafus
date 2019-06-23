import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

//routes
import ListCategory from '../../routes/list_categories/list_categories'
import ListExpenses from '../../routes/list_expenses/list_expenses'
import AddCategory from '../../routes/add_category/add_category'
import AddExpense from '../../routes/add_expense/add_expense'

//context 
import TrafusContext from '../../contexts/trafus_context'
import starting_context from "../../contexts/starting_point"

import './App.css'

class App extends Component{
    state = {
        ...starting_context
    }
    addCategory = (category)=>{
        const current_cats = [...this.state.trafus_categories]
        const last_id = current_cats[current_cats.length-1].id
        const new_category = {
            name:category.name,
            team_id:category.team_id,
            budget:category.budget,
            id:last_id+1
        }
        this.setState({
            trafus_categories:[...current_cats,new_category]
        })
    }

    addExpense = (expense)=>{
        const current_exp = [...this.state.trafus_expenses]
        const last_id = current_exp[current_exp.length-1].id
        const new_expense = {
            name:expense.name,
            expense:expense.expense,
            category_id: expense.category_id,
            id:last_id+1
        }
        this.setState({
            trafus_expenses:[...current_exp,new_expense]
        })
    }

    render(){
        const contextValue = {
            ...this.state
        }
        contextValue.addCategory=this.addCategory
        contextValue.addExpense=this.addExpense
        console.log(contextValue)   
        return (
          <TrafusContext.Provider value={contextValue}>
            <h1>Trafus-placeholder here</h1>
            <Switch>
                <Route
                    exact
                    path={'/:userId/:teamId'}
                    component={ListCategory}
                />
                <Route
                    exact
                    path={'/:userId/:teamId/add_category'}
                    component={AddCategory}
                />
                <Route
                    exact
                    path={`/:userId/:teamId/:categoryId/add_expense`}
                    component={AddExpense}
                />
                <Route
                    exact
                    path={'/:userId/:teamId/:categoryId'}
                    component={ListExpenses}
                /> 
            </Switch>
          </TrafusContext.Provider>
    )
  }
}

export default App
