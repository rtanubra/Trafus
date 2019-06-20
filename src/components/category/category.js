import React, {Component} from 'react'
import './category.css'
import CategorySummaryTable from './category_summary'

class Category extends Component{
    
    render(){
        const { category} = this.props
        return (
            <section className="category" >
                <h3>{category.name}</h3>
                <CategorySummaryTable category={this.props.category} expenses={this.props.expenses}  />
                <button className="css_add_expense">Add an Expense</button>
            </section>
        )
        
    }
}

export default Category