import React from 'react'
import ReactDOM from 'react-dom'
import AddCategoryForm from './addCategory'
import {BrowserRouter} from 'react-router-dom'

describe('addCategoryForm',()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><AddCategoryForm teamId={1} userId={1} /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

})

