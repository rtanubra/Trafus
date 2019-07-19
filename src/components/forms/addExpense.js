import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'

import ErrorMessage from '../error/ErrorMessage'
import ButtonTemplate from '../button/button'
import TrafusContext from '../../contexts/trafus_context'

import ValidateHelper from '../../services/validator'

class AddExpenseForm extends Component{
    static contextType = TrafusContext

    state = {
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

    handleNameChange= (event)=>{
        const name = event.target.value;
        let error_name = false
        let error_expense = this.state.error.error_expense
        let error_message_name = ""
        let error_message_expense = this.state.error_message.error_message_expense
        
        const valid = ValidateHelper.nameCheck(name)
        if (!valid[0]){
            error_name= true
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
    handleSubmit= (event)=>{
        event.preventDefault()
        if (this.state.error.error_expense || this.state.error.error_name){
            //do nothing we have errors
        }
        else{
            const { categoryId} = this.props
            const expense = {
                name:this.state.name,
                expense:parseFloat(this.state.expense),
                category_id:parseInt(categoryId)
            }
            this.context.addExpense(expense)
            this.setState({
                name:"",
                expense:"",
                success:true
            })
        }
        
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
        const {userId,teamId, categoryId, category} = this.props
        if (this.state.success){
            return <Redirect to ={`/${userId}/${teamId}/${categoryId}`} />
        }
        return(<form onSubmit={this.handleSubmit}>
                    <fieldset>
                        {this.state.error.error_name? <ErrorMessage message={this.state.error_message.error_message_name} />  : ""}
                        <legend>Add Expense</legend>
                        <label htmlFor="js_expense_name" >Expense Name</label>
                        <input required onChange={this.handleNameChange} value={this.state.name} id="js_expense_name" name="js_expense_name" type="text" />
                        <br/>
                        {this.state.error.error_expense ? <ErrorMessage message={this.state.error_message.error_message_expense } />  : ""}
                        <label htmlFor="js_expense_amount" >Expense Amount</label>
                        <input required type="number" min="0" max="100000" step="0.01" onChange={this.handleExpenseChange} name="js_expense_amount" id="js_expense_amount" value={this.state.expense} />
                        <br/>
                        <ButtonTemplate type="submit" className="css_submit_button" label="Submit"  />
                        <Link to={`/${userId}/${teamId}/${categoryId}`} ><ButtonTemplate className="css_back_button" label={`Back to ${category.name}`}/></Link>
                    </fieldset>
                </form>)
    }
}

export default AddExpenseForm