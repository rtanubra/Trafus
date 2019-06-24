import React, {Component} from 'react'
import './expense.css'
import {Link} from 'react-router-dom'

class Expense extends Component{
    render(){
        return (
            <li><Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.categoryId}/${this.props.expense.id}/`} >{this.props.expense.name}</Link> - ${this.props.expense.expense}</li>
        )
    }
}

export default Expense