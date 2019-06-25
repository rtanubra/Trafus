import React, {Component} from 'react'

class CategorySummaryTable extends Component {
    calculateCurrentExpense(category,expenses){
        let spent = 0
        expenses.forEach(expense=>{
            if(expense.category_id === category.id && expense.active===true){
                spent += expense.expense
            }
        })
        return spent

    }
    roundMe = (number)=>{
        return Math.round(number * 100)/100
    }
    render(){

        const current_expense = this.calculateCurrentExpense(this.props.category,this.props.expenses)
        const remaining = this.props.category.budget - current_expense
        return(
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
                        <td>{this.roundMe(this.props.category.budget)}</td>
                        <td>{this.roundMe(current_expense)}</td>
                        <td>{this.roundMe(remaining)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default CategorySummaryTable