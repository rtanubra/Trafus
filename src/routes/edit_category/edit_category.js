import React, {Component} from 'react'
import TrafusContext from '../../contexts/trafus_context'
import {Redirect,Link} from 'react-router-dom'

import ButtonTemplate from '../../components/button/button'
import ErrorMessage from '../../components/error/ErrorMessage'

class EditCategory extends Component{
    static contextType = TrafusContext
    state = {
        name:"",
        budget:"",
        error:{
            error_name:false,
            error_budget:false
        },
        error_message:{
            error_message_name:"",
            error_message_budget:""
        },
        success:false,
        newCategoryId:""
    }
    componentDidMount(){
        const {userId, teamId,categoryId} = this.props.match.params
        const category = this.context.trafus_categories.find(cat=>{
            return cat.id === parseInt(categoryId)
        })
        this.setState({
            name:category.name,
            budget:category.budget
        })
    }
    handleNameChange = (event)=>{
        const name = event.target.value
        let error_name = false
        let error_budget = this.state.error.error_budget
        let error_message_name = ""
        let error_message_budget= this.state.error_message.error_message_budget
        if(name.length < 3){
            error_name = true
            error_message_name = "Category Name Should be longer than 3 characters"
        } 
        if(name.startsWith(" ") || name.endsWith(" ")){
            error_name=true
            error_message_name = "Category Name should not begin or end with a ' ' space"
        } 

        this.setState({
            name,
            error:{
                error_name:error_name,
                error_budget:error_budget
            }, error_message:{
                error_message_name:error_message_name,
                error_message_budget:error_message_budget
            }
        })
    }
    handleBudgetChange = (event)=>{
        const budget = event.target.value
        let error_name = this.state.error.error_name
        let error_budget = false
        let error_message_name = this.state.error_message.error_message_name
        let error_message_budget= ""
        
        if(budget < 0 || budget > 100000){
            error_budget= true
            error_message_budget = "Expectd budget should be between 0 - 100,000"
        }

        this.setState({
            budget,
            error:{
                error_name,error_budget
            },
            error_message:{
                error_message_name,error_message_budget
            }
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()

        this.context.editCategory({
            name:this.state.name,
            budget:this.state.budget,
            id: this.props.match.params.categoryId
        })
        this.setState({
            success:true
        })
    }
    render(){
        const {userId, teamId, categoryId} = this.props.match.params
        const category =this.context.trafus_categories.find(cat=>{
            return cat.id == categoryId
        })
        if (this.state.success){
            return <Redirect to={`/${userId}/${teamId}/`} />
        }
        return (
            <div>
                <h2>Edit - {this.state.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Edit Category</legend>
                        {this.state.error.error_name ? <ErrorMessage message={this.state.error_message.error_message_name} /> :""}
                        <label htmlFor="js_category_name" >Category Name : </label>
                        <input required onChange={this.handleNameChange} value={this.state.name} type="text" name="js_category_name" id="js_category_name"/>
                        <br/>
                        {this.state.error.error_budget? <ErrorMessage message={this.state.error_message.error_message_budget} /> : "" }
                        <label htmlFor="js_category_budget" >Expected Budget : </label>
                        <input value={this.state.budget} onChange={this.handleBudgetChange} required type="number" min="0" step="0.01" max="100000" name="js_category_budget" id="js_category_budget"/>
                        <br/>
                        <ButtonTemplate className="css_submit_button" type="submit" label="Submit" />
                        <Link to={`/${userId}/${teamId}/`} >
                            <ButtonTemplate className="css_back_button" label="Go Back"/>
                        </Link>
                    </fieldset>
                </form>
            </div>
        )
    }
    
}
export default EditCategory