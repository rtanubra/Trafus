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

class SwitchHandler extends Component{
    render(){
        return(<Switch>
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
            </Switch>)
    }
}

export default SwitchHandler