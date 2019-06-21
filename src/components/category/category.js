import React, {Component} from 'react'
import './category.css'
import CategorySummaryTable from './category_summary'
import { Link } from 'react-router-dom'

class Category extends Component{
 
    render(){
        const { category} = this.props
        const anchorRef = React.createRef()
        return (
            <section className="category" >
                <h3>{category.name}</h3>
                <CategorySummaryTable category={this.props.category} expenses={this.props.expenses}  />

                    <button className="css_add_expense">Add an Expense</button>

                <Link to={`/${this.props.userId}/${this.props.teamId}/${category.id}`}  >
                    <button className="css_expense_detail">{category.name} detail</button>
                </Link>
            </section>
        )
        
    }
}

export default Category