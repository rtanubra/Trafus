import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import NavAuth from './NavAuth'
import NavBar from './navbar'

describe('NavBar',()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><NavBar/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

describe('NavAuth',()=>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><NavAuth loggedin={true} /></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})