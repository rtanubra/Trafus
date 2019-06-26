import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import AddCategoryForm from './addCategory'
import AddExpenseForm from './addExpense'
import Fixture from '../../fixtures/fixtures'

describe('AddCategoryForm',()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><AddCategoryForm teamId={1} userId={1} /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

describe('AddExpenseForm',()=>{
    it('renders without crashing',()=>{
        const div = document.createElement('div')
        ReactDOM.render(<BrowserRouter>
            <AddExpenseForm 
                userId={1} 
                teamId={1} 
                categoryId={1} 
                category={Fixture.trafus_categories[0]}
            />
        </BrowserRouter>,div)
        ReactDOM.unmountComponentAtNode(div)
    })
})

