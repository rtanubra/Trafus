import React, {Component} from 'react'
import './category.css'
import CategorySummaryTable from './category_summary'
import { Link } from 'react-router-dom'
import ButtonTemplate from '../../components/button/button'

class Category extends Component{
 
    render(){
        const { category} = this.props
        const anchorRef = React.createRef()
        return (
            <section className="category" >
                <h3>{category.name}</h3>
                <CategorySummaryTable category={this.props.category} expenses={this.props.expenses}  />
                <Link to={`/${this.props.userId}/${this.props.teamId}/${category.id}/add_expense`}>
                    <ButtonTemplate className="css_add_expense" label="Add an Expense"/>
                </Link>
                <Link to={`/${this.props.userId}/${this.props.teamId}/${category.id}`}  >
                    <ButtonTemplate className="css_expense_detail" label={`${category.name} detail`}/>
                </Link>
            </section>
        )
        
    }
}

export default Category