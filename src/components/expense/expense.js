import React, {Component} from 'react'
import './expense.css'
import {Link} from 'react-router-dom'
import '../button/button.css'
import NumberService from '../../services/number-services'
import DateService from '../../services/date-services'

class Expense extends Component{
    render(){
        //DateService.createDate(this.props.expense.date_created)
        return (
            <li>
                {DateService.createDate(this.props.expense.date_created)} - {this.props.user?this.props.user.user_name:""}<br/>
                <Link 
            to={`/${this.props.userId}/${this.props.teamId}/${this.props.categoryId}/${this.props.expense.id}/edit/`} >
                <button className="css_edit_category small" >
                    Edit
                </button></Link>
                {this.props.expense.name} - 
                {NumberService.dollarFormat(this.props.expense.expense)} 
            </li>
        )
    }
}

export default Expense