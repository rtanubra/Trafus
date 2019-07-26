import React, {Component} from 'react'
import './expense.css'
import {Link} from 'react-router-dom'
import '../button/button.css'
import NumberService from '../../services/number-services'

class Expense extends Component{
    render(){
        return (
            <li><Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.categoryId}/${this.props.expense.id}/edit/`} ><button className="css_edit_category small" >Edit</button></Link>{this.props.expense.name} - {NumberService.dollarFormat(this.props.expense.expense)}</li>
        )
    }
}

export default Expense