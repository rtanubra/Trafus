import React, {Component} from 'react'
import NumberService from '../../services/number-services'

class CategorySummaryTable extends Component {

    render(){
        const budget = NumberService.roundMe(this.props.budget)
        const expense = NumberService.roundMe(this.props.current_expense)
        const remaining = NumberService.roundMe(budget-expense)
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
                        <td>{NumberService.dollarFormat(budget)}</td>
                        <td>{NumberService.dollarFormat(expense)}</td>
                        <td>{NumberService.dollarFormat(remaining)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default CategorySummaryTable