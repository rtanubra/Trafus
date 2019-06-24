import React from 'react'
import ReactDOM from 'react-dom'
import Expense from './expense'
import Fixtures from '../../fixtures/fixtures'

it('Renders without crashing',()=>{
    const div = document.createElement('div');
    const expense = Fixtures.trafus_expenses[0]
    ReactDOM.render(<Expense expense={expense}/>, div);
    ReactDOM.unmountComponentAtNode(div);
})