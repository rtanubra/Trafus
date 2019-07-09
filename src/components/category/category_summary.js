import React, {Component} from 'react'

class CategorySummaryTable extends Component {
    roundMe = (number)=>{
        return Math.round(number * 100)/100
    }
    render(){
        const budget = this.roundMe(this.props.budget)
        const expense = this.roundMe(this.props.current_expense)
        const remaining = this.roundMe(budget-expense)
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
                        <td>{budget}</td>
                        <td>{expense}</td>
                        <td>{remaining}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default CategorySummaryTable