import React from 'react'
import ReactDOM from 'react-dom'
import Expense from './expense'
import Fixtures from '../../fixtures/fixtures'
import {BrowserRouter} from 'react-router-dom'

it('Renders without crashing',()=>{
    const div = document.createElement('div');
    const expense = Fixtures.trafus_expenses[0]
    ReactDOM.render(<BrowserRouter><Expense expense={expense}/></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
})