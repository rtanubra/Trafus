import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

//routes
import ListCategory from '../../routes/list_categories/list_categories'
import ListExpenses from '../../routes/list_expenses/list_expenses'
import AddCategory from '../../routes/add_category/add_category'
import AddExpense from '../../routes/add_expense/add_expense'
import LandingPage from '../../routes/landing_page/landing_page'
import EditExpense from '../../routes/edit_expense/edit_expense'
import EditCategory from '../../routes/edit_category/edit_category'

//context 
import TrafusContext from '../../contexts/trafus_context'
import starting_context from "../../contexts/starting_point"

//service
//import ApiService from '../../services/api-services'

import './App.css'

class App extends Component{
    state = {
        ...starting_context
    }
    
    fetchCategories(team_id){
        const base_url = process.env.REACT_APP_BASE_URL_DEV
        const team = team_id 
        const final_url = `${base_url}categories/${team}/`
        
        fetch(final_url).then(response=>{
            if (response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
        }).then(respJson=>{
            console.log(`fetched categories`)
            console.log(respJson)
            this.setState({
                trafus_categories:[...respJson]
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    componentDidMount(){
        const base_url = process.env.REACT_APP_BASE_URL_DEV
        const team = 1 
        const final_url = `${base_url}categories/${team}/`

        this.fetchCategories(1)
        
        fetch(`${base_url}expenses/`).then(response=>{
            if(response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
        }).then(respJson=>{
            console.log(`fetched expenses `)
            console.log(respJson)
            this.setState({
                trafus_expenses:[...respJson]
            })
        }) 
    }

    addCategoryAPI = (category)=>{
        const base_url =process.env.REACT_APP_BASE_URL_DEV
        const team = 1
        console.log(category)
        return fetch(`${base_url}categories/${team}/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(category),
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    }

    editCategoryApi = (category)=>{
        const base_url =process.env.REACT_APP_BASE_URL_DEV
        const url = `${base_url}categories/category/${category.id}/`
        console.log('prior to fetch')
        return fetch(url,{
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(category)
        }).then(()=>{
            this.fetchCategories(1)
        })
    }

    editExpense = (expense)=>{
        const currentExpenses = [...this.state.trafus_expenses]

        currentExpenses.forEach(exp=>{
            if (exp.id === parseInt(expense.id)){
                exp.name = expense.name
                exp.expense = expense.expense
            }
        })
        this.setState({
            trafus_expenses:[...currentExpenses]
        })

    }
    
    
    addExpenseApi= (expense)=>{
        const base_url =process.env.REACT_APP_BASE_URL_DEV
        return fetch(`${base_url}expenses/`,{
            method:"POST",
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(expense)
        }).then(res=>{
            if(!res.ok) {
                return res.json().then(e=> Promise.reject(e))
            }
            return res.json()
        })
    }

    deleteCategory = (category)=>{
        const currentCategories= [...this.state.trafus_categories]
        currentCategories.forEach(cat=>{
            if (cat.id === parseInt(category.id)){
                cat.active= false
            }
        })
        this.setState({
            trafus_categories:[...currentCategories]
        })
    }
    deleteExpense = (expense)=>{
        const currentExpenses = [...this.state.trafus_expenses]
        currentExpenses.forEach(exp=>{
            if(exp.id === parseInt(expense.id)){
                exp.active = false 
            }
        })
        this.setState({
            trafus_expenses:[...currentExpenses]
        })

    }
    render(){
        const contextValue = {
            ...this.state
        }
        contextValue.addCategory=this.addCategoryAPI
        contextValue.addExpense=this.addExpenseApi
        contextValue.editExpense = this.editExpense
        contextValue.editCategory = this.editCategoryApi
        contextValue.deleteCategory=this.deleteCategory
        contextValue.deleteExpense=this.deleteExpense
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
                    path={'/:userId/:teamId/:categoryId/:expenseId/edit'}
                    component={EditExpense}
                />
                <Route
                    exact
                    path={'/:userId/:teamId/:categoryId/'}
                    component={ListExpenses}
                /> 
                <Route
                    exact
                    path={'/:userId/:teamId/:categoryId/edit'}
                    component={EditCategory}
                /> 
                <Route 
                    exact
                    path={'/'}
                    component={LandingPage}
                />
            </Switch>
          </TrafusContext.Provider>
    )
  }
}

export default App
