import React, {Component} from 'react'
import './category.css'
import CategorySummaryTable from './category_summary'
import { Link } from 'react-router-dom'
import ButtonTemplate from '../../components/button/button'

class Category extends Component{
    calculateCurrentExpense(category,expenses){
        let spent = 0
        expenses.forEach(expense=>{
            if(expense.category_id === category.id ){
                spent += expense.expense
            }
        })
        return spent

    }
    render(){
        const current_expenses = this.calculateCurrentExpense(this.props.category,this.props.expenses)

        return (
            <section className="category" >
                <h3>{this.props.category.name}</h3>
                <Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.category.id}/edit`}>
                    <ButtonTemplate className="css_edit_category" label={`Category Details`}/>
                </Link>
                <Link to={`/${this.props.userId}/${this.props.teamId}/${this.props.category.id}/add_expense`}>
                    <ButtonTemplate className="css_add_expense" label="Add an Expense"/>
                </Link>

                <CategorySummaryTable budget={this.props.category.budget} current_expense={current_expenses}  />
            </section>
        )
        
    }
}

export default Category