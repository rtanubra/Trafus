import React, {Component} from 'react'
import './expense.css'

class Expense extends Component{
    render(){
        return (
            <li>{this.props.expense.name} - ${this.props.expense.expense}</li>
        )
    }
}

export default Expense