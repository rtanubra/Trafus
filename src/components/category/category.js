import React, {Component} from 'react'
import './category.css'
import CategorySummaryTable from './category_summary'
import { Link } from 'react-router-dom'
import ButtonTemplate from '../../components/button/button'

class Category extends Component{
 
    render(){

        return (
            <section className="category" >
                <Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.category.id}/edit`} ><h3>{this.props.category.name}</h3></Link>
                <CategorySummaryTable category={this.props.category} expenses={this.props.expenses}  />
                <Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.category.id}/add_expense`}>
                    <ButtonTemplate className="css_add_expense" label="Add an Expense"/>
                </Link>
                <Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.category.id}`}  >
                    <ButtonTemplate className="css_expense_detail" label={`${this.props.category.name} detail`}/>
                </Link>
            </section>
        )
        
    }
}

export default Category