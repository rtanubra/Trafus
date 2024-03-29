import React, {Component} from 'react'
import './edit_expense.css'
import {Link, Redirect} from 'react-router-dom'
import TrafusContext from '../../contexts/trafus_context'

import ButtonTemplate from "../../components/button/button"
import ErrorMessage from '../../components/error/ErrorMessage'
import ValidateHelper from '../../services/validator'
import WarningDelete from '../../components/warning/warning'

class EditExpense extends Component{
    static contextType = TrafusContext
    
    componentDidMount(){
        const expense = this.context.trafus_expenses.find(exp=>{
            return exp.id === parseInt(this.props.match.params.expenseId)
        })
        if (expense){
            this.setState({
                name:expense.name,
                expense:expense.expense
            })
        }
        
    }

    state = {
        delete:false,
        name:"",
        expense:"",
        error:{
            error_name:false,
            error_expense:false
        },
        error_message:{
            error_message_name:"",
            error_message_expense:""
        },
        success:false
    }
    toggleDeleteOn=()=>{
        this.setState({delete:true})
    }
    toggleDeleteOff=()=>{
        this.setState({delete:false})
    }
    handleSubmit= (event)=>{
        event.preventDefault()
        if (this.state.error.error_name || this.state.error.error_expense){
            //do nothing 
        } else {
            
            this.context.editExpense({
                name:this.state.name,
                expense:parseFloat(this.state.expense),
                id:this.props.match.params.expenseId
            })
            this.setState({
                success:true
            })
        }
    }
    handleDelete =()=>{
        const expense = {
            name:this.state.name,
            expense:parseFloat(this.state.expense),
            id:this.props.match.params.expenseId
        }
        this.context.deleteExpense(expense)

        this.setState({
            success:true
        })
    }
    handleNameChange= (event)=>{
        const name = event.target.value;
        let error_name = false
        let error_expense = this.state.error.error_expense
        let error_message_name = ""
        let error_message_expense = this.state.error_message.error_message_expense
        
        const valid = ValidateHelper.nameCheck(name)
        if (!valid[0]){
            error_name=true
            error_message_name = `Expense name ${valid[1]}`
        }

        this.setState({
            name,
            error:{
                error_name:error_name,
                error_expense:error_expense
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_expense:error_message_expense
            }
        })
    }


    handleExpenseChange=(event)=>{
        const expense = event.target.value;
        let error_name = false
        let error_expense = false
        let error_message_name = this.state.error_message.error_message_name
        let error_message_expense = ""
        if (expense <0 || expense > 100000){
            error_expense= true
            error_message_expense = "Expense Amount should be between 0 - 100,000"
        }
        this.setState({
            expense,
            error:{
                error_name,
                error_expense
            },
            error_message:{
                error_message_name,
                error_message_expense
            }
        })
    }

    render(){
        const {userId, teamId, categoryId} = this.props.match.params
        const category = this.context.trafus_categories.find(cat=>{
            return cat.id === parseInt(categoryId)
        })
        if (!window.localStorage.getItem('authToken')||!window.localStorage.getItem('user_id')||!window.localStorage.getItem('team_id')){
            return <Redirect to=""/>
        }
        if (!category){
            return <Redirect to={`/${userId}/${teamId}/${categoryId}`} />
        }
        if(this.state.success){
            return <Redirect to={`/${userId}/${teamId}/${categoryId}/edit`} />
        }
        return (
            <div>
                    <h2>{`Edit ${this.state.name}`}</h2>
                <form onSubmit={this.handleSubmit}>  
                    <fieldset>
                        <legend>Edit Expense</legend>
                        {this.state.error.error_name? <ErrorMessage message={this.state.error_message.error_message_name} />  : ""}
                        <label htmlFor="js_expense_name" >Expense Name</label>
                        <input required onChange={this.handleNameChange} value={this.state.name} id="js_expense_name" name="js_expense_name" type="text" />
                        <br/>
                        {this.state.error.error_expense ? <ErrorMessage message={this.state.error_message.error_message_expense } />  : ""}
                        <label htmlFor="js_expense_amount" >Expense Amount</label>
                        <input required type="number" min="0" max="100000" step="0.01" onChange={this.handleExpenseChange} name="js_expense_amount" id="js_expense_amount" value={this.state.expense} />
                        <br/>
                        <ButtonTemplate type="submit" className="css_submit_button" label="Submit"  />
                        <Link to={`/${userId}/${teamId}/${categoryId}/edit`} ><ButtonTemplate className="css_back_button" label={`Back to Expenses`}/></Link>
                    </fieldset>
                </form>
                {this.state.delete?<WarningDelete backFunction={this.toggleDeleteOff} function={this.handleDelete} name={this.state.name} /> : ""}
                <ButtonTemplate onClick={this.toggleDeleteOn} className="css_delete_button" label={`Delete Expense`} />
            </div>
        )
    }
}

export default EditExpense