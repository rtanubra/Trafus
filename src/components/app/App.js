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
import LoginPage from '../../routes/login_page/login_page'

//context 
import TrafusContext from '../../contexts/trafus_context'
import starting_context from "../../contexts/starting_point"

import './App.css'

import NavBar from '../navbar/navbar'

//config use
import config from '../../config'

class App extends Component{
    state = {
        ...starting_context
    }
    toggleLogin=(message)=>{
        //message is true to login and false to logout
        if(message){
            this.setState({loggedIn:true})
        }else{
            this.setState({loggedIn:false})
        }
    }
    fetchCategories=(team_id)=>{
        const base_url = config.API_ENDPOINT
        const team = team_id 
        const final_url = `${base_url}categories/${team}/`
        
        fetch(final_url).then(response=>{
            if (response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
        }).then(respJson=>{

            this.setState({
                trafus_categories:[...respJson]
            })
            this.fetchExpenses()
        }).catch(err=>{
            console.log(err)
        })
    }
    fetchExpenses=()=>{
        const base_url = config.API_ENDPOINT
        fetch(`${base_url}expenses/`).then(response=>{
            if(response.ok){
                return response.json()
            }
            throw new Error(response.statusText)
        }).then(respJson=>{

            this.setState({
                trafus_expenses:[...respJson]
            })
        })
    }
    componentDidMount(){
        const team = 1 
        this.fetchCategories(team)
    }

    addCategoryApi = (category)=>{
        const base_url =config.API_ENDPOINT
        const team = 1
        return fetch(`${base_url}categories/${team}/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(category),
            })
            .then(res =>{
                if (!res.ok){
                   return res.json().then(jsonRes=>{}) 
                }
                else{
                    this.fetchCategories(1)
                    return res.json()
                }
            }
        )
    }

    editCategoryApi = (category)=>{
        const base_url =config.API_ENDPOINT
        const url = `${base_url}categories/category/${category.id}/`
        fetch(url,{
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(category)
        }).then(()=>{
            this.fetchCategories(1)
        })
    }

    editExpenseApi = (expense)=>{
        const base_url = config.API_ENDPOINT
        const url = `${base_url}expenses/expense/${expense.id}/`
        fetch(url,{
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(expense)
        }).then(()=>{
            this.fetchExpenses()
        })
    }
    
    addExpenseApi= (expense)=>{
        //const base_url =process.env.REACT_APP_BASE_URL_DEV
        const base_url = config.API_ENDPOINT
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
            this.fetchExpenses()
        })
    }

    deleteCategoryApi = (category)=>{
        const base_url =config.API_ENDPOINT
        const url = `${base_url}categories/category/${category.id}/`
        fetch(url,{
            method:'DELETE',
        }).then(res=>{
            if(!res.ok){
                return res.json().then(e=> Promise.reject(e))
            }
            this.fetchCategories(1)
        })
    }

    deleteExpenseApi= (expense)=>{
        const base_url =config.API_ENDPOINT
        const url = `${base_url}expenses/expense/${expense.id}/`
        fetch(url,{
            method:'DELETE'
        }).then(res=>{
            if(!res.ok){
                return res.json().then(e=>Promise.reject(e))
            }
            this.fetchExpenses()
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
        const loggedIn = window.localStorage.getItem('authToken')? true:false
        contextValue.loggedIn=loggedIn
        contextValue.fetchCategories=this.fetchCategories
        contextValue.fetchExpenses=this.fetchExpenses
        contextValue.addCategory=this.addCategoryApi
        contextValue.addExpense=this.addExpenseApi
        contextValue.editExpense = this.editExpenseApi
        contextValue.editCategory = this.editCategoryApi
        contextValue.deleteCategory=this.deleteCategoryApi
        contextValue.deleteExpense=this.deleteExpenseApi
        contextValue.toggleLogin = this.toggleLogin
        return (
          <TrafusContext.Provider value={contextValue}>
            <NavBar/>
            <Switch>
                <Route
                    exact
                    path={'/login'}
                    component={LoginPage}
                />
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
