import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

//routes
import ListCategory from '../../routes/list_categories/list_categories'
import ListExpenses from '../../routes/list_expenses/list_expenses'

import './App.css'

class App extends Component{
  render(){
      return (
          <>
            <h1>Trafus-placeholder here</h1>
            <Switch>
                <Route
                    exact
                    path={'/:userId/:teamId'}
                    component={ListCategory}
                />
                <Route
                    exact
                    path={'/:userId/:teamId/:categoryId'}
                    component={ListExpenses}
                />
            </Switch>
          </>
    )
  }
}

export default App
