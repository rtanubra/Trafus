import './team_summary.css'
import React, {Component} from 'react'

import TrafusContext from '../../contexts/trafus_context'

class TeamSummary extends Component{
    static contextType = TrafusContext
    roundMe = (number)=>{
        return Math.round(number * 100)/100
    }
    calculateExpense=(categories, expenses)=>{
        let totalExpense = 0 
        const catIds = categories.map(cat=>{
            return cat.id
        })
        expenses.forEach(exp=>{
            if (catIds.indexOf(exp.category_id) >-1){
                totalExpense += exp.expense
            }
        })
        return totalExpense

    }
    render(){
        let totalBudget = 0
        

        this.props.categories.forEach(cat=>{
            totalBudget += cat.budget
        })
        const totalExpense = this.calculateExpense(this.props.categories,this.context.trafus_expenses)
        return (
            <div>
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
                            <td>{this.roundMe(totalBudget)}</td>
                            <td>{this.roundMe(totalExpense)}</td>
                            <td>{this.roundMe(totalBudget-totalExpense)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
    
}

export default TeamSummary