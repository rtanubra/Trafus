import React, {Component} from 'react'
import './category.css'
class Category extends Component{
    calculateCurrentExpense(category,expenses){
        let spent = 0
        expenses.forEach(expense=>{
            if(expense.category_id === category.id){
                spent += expense.expense
            }
        })
        return spent

    }
    
    render(){
        const { category, expenses} = this.props
        const current_expense = this.calculateCurrentExpense(category,expenses)
        const remaining = category.budget - current_expense

        return (
            <section className="category" >
                <h3>{category.name}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Budget</th>
                            <th>Current Expense</th>
                            <th>Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{category.budget}</td>
                            <td>{current_expense}</td>
                            <td>{remaining}</td>
                        </tr>
                    </tbody>
                </table>
                <button className="css_add_expense">Add an Expense</button>
            </section>
        )
        
    }
}

export default Category