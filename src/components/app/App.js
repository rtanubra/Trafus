import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'

//routes
import ListCategory from '../../routes/list_categories/list_categories'


import './App.css'

class App extends Component{
  render(){
      return (
          <>
            <h1>Trafus-placeholder here</h1>
            <Switch>
                <Route
                    path={'/:userId/:teamId'}
                    component={ListCategory}
                />
            </Switch>
          </>
    )
  }
}

export default App
